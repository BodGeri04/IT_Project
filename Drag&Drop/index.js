
// Global variable to keep track of the currently dragged stand
// Global variable to keep track of the currently dragged stand
let currentStandID = 0;
let draggedStand = null;
let standHasBeenMoved = false
// References for HTML
const market = document.getElementById('market');
const marketWidthInput = document.getElementById('marketWidth');
const marketHeightInput = document.getElementById('marketHeight');
const marketSizeText = document.getElementById('marketSize');
    // Predefined list of custom stand types
const listStand = [];
// Function to add a stand to the market
function addStand() {

    // Convert the list of custom stand types into a string, joined by commas
    const customTypesString = listStand.join(',');

    // Prompt the user for the size, including the custom types
    const size = prompt(`type of the stand (small, medium, large, ${customTypesString}) ?`);

    const newStand = document.createElement('div');
    // if it s not a predefined type, ask for the size
    if ( listStand.includes(size)) {
        const color = prompt('what color do you want ?');
        const widht = prompt('what widht do you want ?');
        const height = prompt('what height do you want ?');
        newStand.style.width = widht + 'px';
        newStand.style.height = height + 'px';
        newStand.style.background = color;




    }
    else if ((size == 'small' || size == 'medium' || size == 'large')){ // if it s a predefined type, ask for the name
        console.log('invalid type');
    }
    else {
        console.log('invalid type');
        alert('invalid type');
        return;
    }

    const name = prompt('Name of the stand ?');
    newStand.setAttribute('data-name', name);
    newStand.classList.add('stand');
    
    newStand.setAttribute('data-type', size);

    const standID = `stand-${currentStandID++}`;
    newStand.id = standID;

    setStandAttributes(newStand, size);

    // Set initial rotation to 0
    newStand.setAttribute('data-rotation', '0');
    document.getElementById('market').appendChild(newStand);

    addStandToList(newStand);
}
function createNewStand() {

    listStand.push(prompt('Type of the stand ?'));

}
// A "Définir" gomb eseménykezelője
function initialize() {
    const width = marketWidthInput.value;
    const height = marketHeightInput.value;

    // Ellenőrzés: csak pozitív értékeket engedélyezünk
    if (width > 0 && height > 0) {
        market.style.width = width + 'px';
        market.style.height = height + 'px';
        marketSizeText.textContent = `widht: ${width}px, height: ${height}px`;
    } else {
        marketSizeText.textContent = 'please enter a positive number';
    }
}





function setStandAttributes(stand, size) {
    let widht=marketWidthInput.value;
    let height=marketHeightInput.value
    switch (size) {
        case 'large':
            stand.style.width =widht/25+'px';
            stand.style.height =height/30+'px';
            stand.style.background = 'red';
            break;
        case 'medium':
            stand.style.width = widht/40+'px';
            stand.style.height = height/30+'px';
            stand.style.background = 'yellow';
            break;
        case 'small':
            stand.style.width = widht/50+'px';
            stand.style.height = height/30+'px';
            stand.style.background = 'green';
            break;
    }
}

// Function to add a stand to the list

function removeStand(stand) {
    // Remove stand from the market
    stand.remove();

    // Remove stand from the list
    const listItems = document.querySelectorAll('#standsList li');
    listItems.forEach(item => {
        if (item.innerText.includes(stand.id)) {
            item.remove();
        }
    });
}
function addStandToList(stand) {
    const standInfo = `Nom: ${stand.getAttribute('data-name')}, Type: ${stand.getAttribute('data-type')}, ID: ${stand.id}, X: ${stand.style.left}, Y: ${stand.style.top}, Rotation: ${stand.getAttribute('data-rotation')}`;
    const listItem = document.createElement('li');
    listItem.innerText = standInfo;

    const deleteCrossForList = document.createElement('span');

    deleteCrossForList.innerText = ' ×';
    deleteCrossForList.style.fontSize = '20px';
    deleteCrossForList.style.color = 'red';

    deleteCrossForList.classList.add('delete-cross-for-list');
    deleteCrossForList.style.cursor = 'pointer';
    deleteCrossForList.addEventListener('click', function () {
        removeStand(stand);
    });
    listItem.appendChild(deleteCrossForList);
    document.getElementById('standsList').appendChild(listItem);
}
//display the list of stands
function displayListStand() {
    const listStand = document.getElementById('standsList');
    const listItems = document.querySelectorAll('#standsList li');
    listItems.forEach(item => {
        console.log(item.innerText);//ou console.log(item);
    });

}
// Function to update the position of a stand in the list

function updateStandPositionInList(stand) {
    const listItems = document.querySelectorAll('#standsList li');
    listItems.forEach(item => {
        if (item.innerText.includes(stand.id)) {
            const name = stand.getAttribute('data-name');
            const type = stand.getAttribute('data-type');
            let updatedText;

            updatedText = `Nom: ${name}, Type: ${type}, ID: ${stand.id}, X: ${stand.style.left}, Y: ${stand.style.top},Rotation: ${stand.getAttribute('data-rotation')}`;

            item.innerText = updatedText;

            // Add the delete cross without overwriting the text
            if (!item.querySelector('.delete-cross-for-list')) {
                const deleteCrossForList = document.createElement('span');
                deleteCrossForList.innerText = ' ×';
                deleteCrossForList.style.fontSize = '20px';
                deleteCrossForList.style.color = 'red';
                deleteCrossForList.style.cursor = 'pointer';
                deleteCrossForList.classList.add('delete-cross-for-list');
                deleteCrossForList.addEventListener('click', function () {
                    removeStand(stand);
                });
                item.appendChild(deleteCrossForList);
            }
        }
    });
}




// Function to check if two stands (rectangles) overlap
function isOverlapping(rect1, rect2) {
    return !(rect1.left > rect2.right ||
        rect1.right < rect2.left ||
        rect1.top > rect2.bottom ||
        rect1.bottom < rect2.top);
}

// Function to get the bounding box of a stand (rectangle)
function getBoundingBox(stand) {
    return {
        left: stand.offsetLeft,
        right: stand.offsetLeft + stand.offsetWidth,
        top: stand.offsetTop,
        bottom: stand.offsetTop + stand.offsetHeight
    };
}

// Updating the mousemove event listener to include collision detection
document.getElementById('market').addEventListener('mousemove', function (event) {
    if (draggedStand) {
        const x = event.clientX - document.getElementById('market').offsetLeft - (draggedStand.offsetWidth / 2);
        const y = event.clientY - document.getElementById('market').offsetTop - (draggedStand.offsetHeight / 2);

        // Potential new position for the dragged stand
        const potentialBox = {
            left: x,
            right: x + draggedStand.offsetWidth,
            top: y,
            bottom: y + draggedStand.offsetHeight
        };

        let collisionDetected = false;
        standHasBeenMoved = true;
        // Check against all other stands for collision
        const allStands = document.querySelectorAll('.stand');
        allStands.forEach(stand => {
            if (stand !== draggedStand) {
                const standBox = getBoundingBox(stand);
                if (isOverlapping(potentialBox, standBox)) {
                    collisionDetected = true;
                    console.log("Collision detected!");
                }
            }
        });

        // Only update position if no collision is detected
        if (!collisionDetected) {
            draggedStand.style.left = `${x}px`;
            draggedStand.style.top = `${y}px`;
        }
    }
}
);







function rotateStand(event) {
    // Get the stand element
    const stand = event.target;

    // Get the current rotation value
    const currentRotation = parseInt(stand.getAttribute('data-rotation'));

    // Calculate the new rotation value (toggle between 0 and 90 degrees)
    const newRotation = (currentRotation + 90) % 180;

    // Get the stand's dimensions
    const width = stand.offsetWidth;
    const height = stand.offsetHeight;

    // Calculate the center of the stand
    const centerX = stand.offsetLeft + width / 2;
    const centerY = stand.offsetTop + height / 2;

    // Calculate the new top-left coordinates after rotation
    let newX, newY;
    if (newRotation === 90) {
        // The stand is rotated by 90 degrees
        newX = centerX - height / 2;
        newY = centerY - width / 2;
    } else {
        // The stand is rotated back to 0 degrees
        newX = centerX - width / 2;
        newY = centerY - height / 2;
    }

    // Apply the new rotation and position
    stand.style.transform = `rotate(${newRotation}deg)`;
    stand.style.left = `${newX}px`;
    stand.style.top = `${newY}px`;

    // Update the data-rotation attribute
    stand.setAttribute('data-rotation', newRotation.toString());
    displayListStand();

}

// Make sure to attach this function to the double-click event as before


document.getElementById('market').addEventListener('click', function (event) {
    if (event.target.classList.contains('stand')) {
        handleStandClick(event);
    }
});

let lastClickTime = 0;
const doubleClickDelay = 300; // Délai en millisecondes pour le double-clic

function handleStandClick(event) {
    const currentTime = Date.now();
    if (currentTime - lastClickTime < doubleClickDelay) {
        // C'est un double-clic
        rotateStand(event);
        updateStandPositionInList(event.target);
        draggedStand = null;
    }
    lastClickTime = currentTime;
}
document.getElementById('market').addEventListener('mouseup', function () {
    if (draggedStand && standHasBeenMoved) {
        updateStandPositionInList(draggedStand);
        draggedStand = null;
        standHasBeenMoved = false;
        console.log("Stand has been moved");
    }
});

// Event listeners for drag-and-drop functionality
document.getElementById('market').addEventListener('mousedown', function (event) {
    if (event.target.classList.contains('stand')) {
        draggedStand = event.target;
        console.log("Stand has been dragged");
    }
});



