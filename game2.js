document.addEventListener('DOMContentLoaded', function () {
    const story = document.getElementById('story');

    const stories = [
        {
            text: "You find yourself in a mystical forest...",
            choices: [
                { text: "Explore deeper", action: "exploreForest" },
                { text: "Return to the village", action: "returnToVillage" }
            ]
        },
        {
            text: "You arrive at a bustling village...",
            choices: [
                { text: "Visit the market", action: "visitMarket" },
                { text: "Go to the town square", action: "goToTownSquare" }
            ]
        },
        {
            text: "You stand before a mysterious cave...",
            choices: [
                { text: "Enter the cave", action: "enterCave" },
                { text: "Explore the surroundings", action: "exploreSurroundings" }
            ]
        },
        {
            text: "A grand castle looms in the distance...",
            choices: [
                { text: "Approach the castle", action: "approachCastle" },
                { text: "Take a detour", action: "takeDetour" }
            ]
        },
        {
            text: "An old wizard greets you warmly...",
            choices: [
                { text: "Speak to the wizard", action: "speakToWizard" },
                { text: "Continue your journey", action: "continueJourney" }
            ]
        }
    ];

    // Load a random story from the story pool
    function loadRandomStory() {
        const randomIndex = Math.floor(Math.random() * stories.length);
        const selectedStory = stories[randomIndex];

        let storyContent = `<p>${selectedStory.text}</p>`;
        selectedStory.choices.forEach(choice => {
            storyContent += `<button onclick="${choice.action}()">${choice.text}</button>`;
        });

        story.innerHTML = storyContent;
    }

    // Define functions for deeper story branching
    function exploreForest() {
        story.innerHTML = `
            <p>You venture deeper into the forest and find a hidden artifact...</p>
            <button onclick="artifactChoice()">Choose the artifact</button>
            <button onclick="leaveArtifact()">Leave the artifact</button>
        `;
    }

    function artifactChoice() {
        story.innerHTML = `
            <p>You choose the artifact and feel a surge of energy. This will impact your journey.</p>
            <button onclick="startNewJourney()">Start a new journey</button>
        `;
    }

    function leaveArtifact() {
        story.innerHTML = `
            <p>You decide to leave the artifact and return to the village.</p>
            <button onclick="returnToVillage()">Return to the village</button>
        `;
    }

    function returnToVillage() {
        story.innerHTML = `
            <p>You return to the village, where the townsfolk welcome you warmly. What's next?</p>
            <button onclick="exploreVillage()">Explore the village</button>
        `;
    }

    function exploreVillage() {
        story.innerHTML = `
            <p>The village is bustling with activity. You can visit the market or the town square.</p>
            <button onclick="visitMarket()">Visit the market</button>
            <button onclick="goToTownSquare()">Go to the town square</button>
        `;
    }

    function visitMarket() {
        story.innerHTML = `
            <p>You visit the market and meet a mysterious merchant. He offers rare items in exchange for information.</p>
            <button onclick="negotiateWithMerchant()">Negotiate with the merchant</button>
        `;
    }

    function negotiateWithMerchant() {
        story.innerHTML = `
            <p>The merchant shares valuable information about hidden secrets in the village.</p>
            <button onclick="exploreVillage()">Explore the village</button>
        `;
    }

    function speakToWizard() {
        story.innerHTML = `
            <p>The wizard shares his wisdom and gives you a magical amulet. This will guide you.</p>
            <button onclick="startNewJourney()">Start a new journey</button>
        `;
    }

    function startNewJourney() {
        loadRandomStory();
    }

    // Expose functions to the global scope for interaction
    window.loadRandomStory = loadRandomStory;
    window.exploreForest = exploreForest;
    window.artifactChoice = artifactChoice;
    window.leaveArtifact = leaveArtifact;
    window.returnToVillage = returnToVillage;
    window.exploreVillage = exploreVillage;
    window.visitMarket = visitMarket;
    window.negotiateWithMerchant = negotiateWithMerchant;
    window.speakToWizard = speakToWizard;
    window.startNewJourney = startNewJourney;

    loadRandomStory();
});
