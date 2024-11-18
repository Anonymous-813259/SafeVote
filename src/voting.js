// Sample candidates data
const candidates = [
    { id: 1, name: "Manoj", party: "Congress Party" },
    { id: 2, name: "Harsha", party: "TRS Party" },
    { id: 3, name: "Shiva", party: "BJP Party" },
    { id: 4, name: "Nikhil", party: "TDP Party" },
    { id: 5, name: "Arjun", party: "JanaSena Party" },
    { id: 6, name: "Vimal", party: "MIM Party" },
    { id: 7, name: "Varun", party: "TVK Party" },
    { id: 8, name: "Kiran", party: "ADMK Party" },
];

// Function to render candidates dynamically
function renderCandidates() {
    const container = document.getElementById("candidates-container");

    candidates.forEach(candidate => {
        // Create a candidate card
        const card = document.createElement("div");
        card.className = "candidate-card";

        // Add candidate details
        card.innerHTML = `
            <h3>${candidate.name}</h3>
            <p>Party: ${candidate.party}</p>
            <button onclick="castVote(${candidate.id})">Vote</button>
        `;

        // Append to the container
        container.appendChild(card);
    });
}

// Function to cast vote
function castVote(candidateId) {
    const selectedCandidate = candidates.find(candidate => candidate.id === candidateId);

    if (selectedCandidate) {
        alert(`You voted for ${selectedCandidate.name} from ${selectedCandidate.party}.`);
    } else {
        alert("Invalid candidate selected!");
    }
}

// Render candidates on page load
window.onload = renderCandidates;
