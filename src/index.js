async function connectWallet(){
    alert("Clicked!");
    if(window.ethereum){
        web3 = new Web3(window.ethereum);
        await window.ethereum.request;
        window.location.href="category.html";
    }
    else{
        alert("MetaMask is not detected. Please install it.");
    }
}