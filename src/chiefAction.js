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

async function updateChief() {
    const aadhaar = document.getElementById('aadhaar').value;
    const id = document.getElementById('chiefId').value;

    try{
        const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
        currentAccount = accounts[0];
        const res = await chiefValidatationContract.methods.updateDetails(aadhaar, id).send({from: currentAccount});
        const res1 = await safeVoteContract.methods.resetChief().send({from: currentAccount});

        alert("Chief Details Updated Successfully");
        window.location.href="category.html";
    }
    catch(error){
        alert("Got an error - > 1");
        console.log("Error: ",error);
    }
}

async function registerCandidate() {
    const id = document.getElementById('candidateId').value;
    const name = document.getElementById('candidateName').value;
    const age = document.getElementById('candidateAge').value;
    const party = document.getElementById('partyName').value;
    const district = document.getElementById('district').value;
    const state = document.getElementById('state').value;

    try{
        const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
        currentAccount = accounts[0];
        const res = await safeVoteContract.methods.registerCandidate(id, name, age, district, state).send({from: currentAccount});
        alert(id+"Registered Successfully");
    }
    catch(error){
        alert("You got an error -> 2");
        console.log('Error: ',error);
    }
}

async function startCandidateRegistration(){
    try{
        const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
        currentAccount = accounts[0];
        const res = await safeVoteContract.methods.setCandidateRegistration().send({from: currentAccount});
        alert("Time Started for candidate registration");
    }
    catch(error){
        alert("You got an error -> 3");
        console.log("Error: ",error);
    }
}

async function startVoterRegistration() {
    try{
        const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
        currentAccount = accounts[0];
        const res = await safeVoteContract.methods.setVoterRegistration().send({from: currentAccount});
        alert("Time Started for voter registration");
    }
    catch(err){
        alert("You got an error -> 4");
        console.log("Error: ",err);
    }
}

async function startVoting() {
    try{
        const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
        currentAccount = accounts[0];
        const res = await safeVoteContract.methods.setVoting().send({from: currentAccount});
        alert("Time Started for voting");
    }
    catch(err){
        alert("You got an error -> 5");
        console.log("Error: ",err);
    }
}

async function viewResults() {
    try{
        const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
        currentAccount = accounts[0];
        const res = await safeVoteContract.methods.setResultView().send({from: currentAccount});
        alert("Time Started for results checking");
    }
    catch(err){
        alert("You got an error -> 5");
        console.log("Error: ",err);
    }
}

setABIAddress();