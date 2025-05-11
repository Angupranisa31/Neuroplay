document.addEventListener('DOMContentLoaded', function () {
    const player = document.getElementById('player');
    const memoryObjects = document.querySelectorAll('.memory');
    const memoryInput = document.getElementById('memoryInput');
    const memoryQuestion = document.getElementById('memoryQuestion');
    const userResponse = document.getElementById('userResponse');
    const submitResponse = document.getElementById('submitResponse');
    const mediaUpload = document.getElementById('mediaUpload');

    let playerPosition = { x: 50, y: 50 }; // Start at the center
    const stepSize = 2; // Movement increment
    const playerSize = { width: 40, height: 40 }; // Size of the ball
    let currentMemory = null;
    const completedMemories = new Set(); // To track completed memory spheres

    // Ensure player position stays within boundaries
    function updatePlayerPosition() {
        const halfPlayerWidth = playerSize.width / 2;
        const halfPlayerHeight = playerSize.height / 2;

        // Constrain the position within bounds
        playerPosition.x = Math.max(
            halfPlayerWidth,
            Math.min(100 - halfPlayerWidth, playerPosition.x)
        );

        playerPosition.y = Math.max(
            halfPlayerHeight,
            Math.min(100 - halfPlayerHeight, playerPosition.y)
        );

        // Apply the updated position
        player.style.left = `${playerPosition.x}%`;
        player.style.top = `${playerPosition.y}%`;
    }
    

    // Event listener for keyboard movement
    document.addEventListener('keydown', function (event) {
        let moved = false;

        switch (event.key) {
            case 'ArrowUp':
                playerPosition.y -= stepSize;
                moved = true;
                break;
            case 'ArrowDown':
                playerPosition.y += stepSize;
                moved = true;
                break;
            case 'ArrowLeft':
                playerPosition.x -= stepSize;
                moved = true;
                break;
            case 'ArrowRight':
                playerPosition.x += stepSize;
                moved = true;
                break;
            default:
                return; // Ignore other keys
        }

        if (moved) {
            updatePlayerPosition(); // Apply constraints and update position
            checkMemoryCollisions(); // Check for collisions
        }
    });

    // Function to check for collisions with memory spheres
    function checkMemoryCollisions() {
        let hasCollision = false;
        currentMemory = null;

        memoryObjects.forEach((memory) => {
            if (completedMemories.has(memory.id)) {
                return; // Skip completed memory spheres
            }

            const playerRect = player.getBoundingClientRect();
            const memoryRect = memory.getBoundingClientRect();

            if (
                playerRect.left < memoryRect.right &&
                playerRect.right > memoryRect.left &&
                playerRect.top < memoryRect.bottom &&
                playerRect.bottom > memoryRect.top
            ) {
                memoryInput.style.display = 'block'; // Show the memory input card
                memoryQuestion.textContent = memory.getAttribute('data-prompt'); // Set the prompt question
                userResponse.focus();
                currentMemory = memory;
                hasCollision = true;
            }
        });

        if (!hasCollision) {
            memoryInput.style.display = 'none'; // Hide if there's no collision
        }
    }

    // Remove duplicate `submitResponse` event listener
    submitResponse.addEventListener('click', function () {
        if (currentMemory && mediaUpload.files.length > 0) {
            const file = mediaUpload.files[0];
            const reader = new FileReader();

            reader.onload = function (e) {
                const imageDataUrl = e.target.result;
                currentMemory.style.backgroundImage = `url(${imageDataUrl})`; // Set background
                currentMemory.style.backgroundSize = 'cover';
                currentMemory.style.backgroundPosition = 'center';

                // Store the user response
                currentMemory.setAttribute('data-user-response', userResponse.value);

                // Mark as completed and hide the card
                completedMemories.add(currentMemory.id);
                memoryInput.style.display = 'none';
                userResponse.value = ''; // Clear the text field
                mediaUpload.value = ''; // Reset the file input
            };

            reader.readAsDataURL(file); // Read the Data URL
        }
    });

    const tooltip = document.getElementById('tooltip'); // Ensure this element exists

    // Logic for displaying the tooltip on hover
    memoryObjects.forEach((memory) => {
        memory.addEventListener('mouseover', function (event) {
            const userResponse = memory.getAttribute('data-user-response');
            if (userResponse) {
                tooltip.textContent = userResponse; // Set tooltip text
                tooltip.style.display = 'block'; // Show the tooltip
                tooltip.style.left = `${event.pageX + 10}px`; // Position tooltip
                tooltip.style.top = `${event.pageY + 10}px`;
            }
        });

        memory.addEventListener('mouseout', function () {
            tooltip.style.display = 'none'; // Hide when the mouse leaves
        });

        memory.addEventListener('mousemove', function (event) {
            // Keep the tooltip position in sync with the cursor
            tooltip.style.left = `${event.pageX + 10}px`;
            tooltip.style.top = `${event.pageY + 10}px`;
        });
    });
});
