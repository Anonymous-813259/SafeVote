// Sample candidates with their details
const candidates = [
    { name: "Arjun", party: "JanaSena Party", votes: 320 },
    { name: "Harsha", party: "TRS Party", votes: 290 },
    { name: "Kiran", party: "ADMK Party", votes: 180 },
    { name: "Varun", party: "TVK Party", votes: 150 },
    { name: "Manoj", party: "Congress Party", votes: 120 },
    { name: "Vimal", party: "MIM Party", votes: 100 },
    { name: "Nikhil", party: "TDP Party", votes: 120 },
    { name: "Shiva", party: "BJP Party", votes: 100 },
];

// Sort candidates by votes in descending order
candidates.sort((a, b) => b.votes - a.votes);

// Dynamically populate the results table
function displayResults() {
    const resultsBody = document.getElementById("results-body");
    candidates.forEach((candidate, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${candidate.name}</td>
            <td>${candidate.party}</td>
            <td>${candidate.votes}</td>
        `;
        resultsBody.appendChild(row);
    });
}

// Call the function to display results on page load
window.onload = displayResults;
