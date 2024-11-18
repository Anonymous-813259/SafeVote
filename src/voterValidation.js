// Function to validate voter details
function validateVoter() {
    // Retrieve input values
    const aadhaarNumber = document.getElementById("aadhaar-number").value.trim();
    const voterId = document.getElementById("voter-id").value.trim();

    // Simple validation for demonstration purposes
    if (aadhaarNumber.length !== 12 || isNaN(aadhaarNumber)) {
        alert("Invalid Aadhaar Number. Please enter a valid 12-digit Aadhaar Number.");
        return;
    }

    if (voterId.length !== 10) {
        alert("Invalid Voter ID. Please enter a valid 10-character Voter ID.");
        return;
    }

    // If validation passes
    alert("Validation successful! Redirecting to the voting page...");
    // Redirect to voting page
    window.location.href = "voting.html";
}
