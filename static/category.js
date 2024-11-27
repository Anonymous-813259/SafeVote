async function initContract() {
    if (window.ethereum) {
        window.ethereum.on('accountsChanged', function (accounts) {
            alert("Account change to: "+accounts[0]);
            console.log("Accounts changed:", accounts);
        });
    
        window.ethereum.on('chainChanged', function (chainId) {
            console.log("Network changed:", chainId);
        });
    }
    else{
        alert("MetaMask is not detected. Please install it.");
        window.location.href = '/index';
    }
}

function navigateTo(page) {
    window.location.href = page;
}

initContract();