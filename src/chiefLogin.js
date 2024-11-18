let cvABI;
let cvAddress;
let chiefValidatationContract;
let chiefAadhaar;
let chiefID;
let safeVoteABI;
let safeVoteAddress;
let safeVoteContract;

async function setABIAddress() {
    let chiefRes = await fetch('../build/contracts/ChiefValidation.json');
    let voteRes = await fetch('../build/contracts/SafeVote.json');
    chiefJSON = await chiefRes.json();
    voteJSON = await voteRes.json();
    cvABI = chiefJSON['abi'];
    safeVoteABI = voteJSON['abi'];
    cvAddress = chiefJSON['networks']['5777']['address'];
    safeVoteAddress = voteJSON['networks']['5777']['address'];
    if(window.ethereum){
        web3 = new Web3(window.ethereum);
    }
    else{
        alert("MetaMask is not detected. Please install it.");
        window.location.href="index.html";
    }
    safeVoteContract = new web3.eth.Contract(safeVoteABI, safeVoteAddress);
    chiefValidatationContract = new web3.eth.Contract(cvABI, cvAddress);
}

async function validateLogin(){
    const aadhaar = document.getElementById('aadhaar').value;
    const electionID = document.getElementById('electionID').value;
    const errorMessage = document.getElementById('errorMessage');

    // Clear any previous error message
    errorMessage.textContent = '';

    // Simple validation
    if (aadhaar.length !== 12 || !/^\d+$/.test(aadhaar)) {
        errorMessage.textContent = "Invalid Aadhaar number. It should be a 12-digit number.";
        return;
    }
    if (electionID.trim() === "") {
        errorMessage.textContent = "Election Member ID cannot be empty.";
        return;
    }

    // Get Chief Aadhaar and Chief ID from ChiefValidation SmartContract.
    try{
        chiefAadhaar = await chiefValidatationContract.methods.chiefAadhaar().call();
        chiefID = await chiefValidatationContract.methods.chiefID().call();
        // Comment down below 2 console.log() commands
        console.log("Extracted Chief Aadhaar: ",chiefAadhaar);
        console.log("Extracted Chief ID: ",chiefID);

        // Validation
        console.log("top if");
        if(aadhaar==chiefAadhaar && electionID==chiefID){
            const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
            console.log(0);
            currentAccount = accounts[0];
            console.log(1);
            // const res = await chiefValidatationContract.methods.resetChief().send({from: currentAccount});
            const chief = await chiefValidatationContract.methods.chief().call();
            console.log("Exracted chief address: ",chief);
            if(chief=="0x0000000000000000000000000000000000000000"){
                const response = await chiefValidatationContract.methods.setChief(aadhaar, electionID).send({from: currentAccount});
                const setResponse = await safeVoteContract.methods.setChief().send({from: currentAccount});
            }
            else if(chief!=currentAccount){
                console.log(chief,currentAccount);
                alert("Wrong chief address!");
                window.location.href="category.html";
            }
            const safeVoteChiefAddress = await safeVoteContract.methods.chief().call();
            // console.log(5);
            console.log("Safe Vote Chief Address: ",safeVoteChiefAddress);
            // console.log(6);
            alert("Login Successful!");
            window.location.href="chiefAction.html";
        }
        else{
            errorMessage.textContent="Invalid Credentials. Please try again.";
        }
    }
    catch(error){
        console.log("Error: ",error);
        alert("You an Error -> 1");
    }
}

setABIAddress();