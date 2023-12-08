
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
// Global array for predefined stand types
const predefinedStandTypes = ['small', 'medium', 'large'];

// Adjusted addStand function
// Global object to store custom stand types with their attributes
let customStandTypes = {};
let allStands = []; // Liste globale pour conserver tous les stands

function addStand(type) {
    const marketWidth = parseInt(marketWidthInput.value);
    const marketHeight = parseInt(marketHeightInput.value);

    if (isNaN(marketWidth) ||isNaN(marketHeight)  ||marketWidth <= 0 || marketHeight <= 0) {
        alert('Please enter the size of the room first!');
        return;
    }
    console.log("type: " + type);

    const newStand = document.createElement('div');
    newStand.classList.add('stand');
    newStand.setAttribute('data-type', type);
    
    // Check if type is custom and not previously defined
    if (!predefinedStandTypes.includes(type) && !customStandTypes[type]) {
        let color, width, height, name;
        console.log("type: " + type);
        while (color === undefined) {
            color = prompt('What color do you want?');
            if (color === null) { // User cancelled the prompt
                console.log('Stand creation cancelled.');
                return; // Exit the function
            } else if (!color) {
                alert('Please enter a valid color.');
                color = undefined; // Reset to undefined to continue the loop
            }
        }
        
        while (width === undefined || isNaN(width) || width <= 0) {
            width = prompt('What width do you want?');
            if (width === null) {
                console.log('Stand creation cancelled.');
                return; // Exit the function
            } else if (!width || isNaN(width) || width <= 0) {
                alert('Please enter a valid width (a positive number).');
                width = undefined; // Reset to continue the loop
            }
        }
        
        while (height === undefined || isNaN(height) || height <= 0) {
            height = prompt('What height do you want?');
            if (height === null) {
                console.log('Stand creation cancelled.');
                return; // Exit the function
            } else if (!height || isNaN(height) || height <= 0) {
                alert('Please enter a valid height (a positive number).');
                height = undefined; // Reset to continue the loop
            }
        }
        
                while (name === undefined) {
                    name = type;

        }

        // Ajouter l'élément du nom du stand au stand
        


        // Store custom type attributes and name
        customStandTypes[type] = {
            color: color,
            width: width,
            height: height,
            name: name
        };
    }

    if (customStandTypes[type]) {
        // Apply stored attributes and name for custom types
        newStand.style.width = customStandTypes[type].width + 'px';
        newStand.style.height = customStandTypes[type].height + 'px';
        newStand.style.background = customStandTypes[type].color;
        newStand.setAttribute('data-name', customStandTypes[type].name);
                // Créer un élément pour le nom du stand
                const name = customStandTypes[type].name;
                const standNameElement = document.createElement('span');
                standNameElement.textContent = name.substring(0, 4); // Utiliser les 4 premiers caractères du nom du stand
                standNameElement.classList.add('stand-name'); // Ajouter une classe pour le styliser
                standNameElement.style.color = 'black'; // Définir la couleur du texte en noir
                standNameElement.style.textAlign = 'center'; // Centrer le texte
                standNameElement.style.display = 'block'; // Assurez-vous que l'élément span se comporte comme un bloc pour permettre le centrage
                standNameElement.style.userSelect = 'none'; // Empêcher la sélection du texte
                standNameElement.style.pointerEvents = 'none'; // Les événements de la souris seront ignorés sur cet élément

               // standNameElement.style.fontSize = `calc(100% / ${x})`;//modifier caaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                // Ajouter l'élément du nom du stand au stand
                newStand.appendChild(standNameElement);
    }else if (predefinedStandTypes.includes(type)) {
        // For predefined types, ask for the name each time
        let name = undefined;
        while (name === undefined) {
            name = prompt('Name of the stand?');
            if (name === null) {
                console.log('Stand creation cancelled.');
                return; // Exit the function
            } else if (!name) {
                alert('Please enter a valid name.');
                name = undefined; // Reset to continue the loop
            }
        }
        newStand.setAttribute('data-name', name);

        const standNameElement = document.createElement('span');
        standNameElement.textContent = name.substring(0, 4); // Utiliser les 4 premiers caractères du nom du stand
        standNameElement.classList.add('stand-name'); // Ajouter une classe pour le styliser
        standNameElement.style.color = 'black'; // Définir la couleur du texte en noir
        standNameElement.style.textAlign = 'center'; // Centrer le texte
        standNameElement.style.display = 'block'; // Assurez-vous que l'élément span se comporte comme un bloc pour permettre le centrage
        standNameElement.style.userSelect = 'none'; // Empêcher la sélection du texte
        standNameElement.style.pointerEvents = 'none'; // Les événements de la souris seront ignorés sur cet élément

                    // Ajouter l'élément du nom du stand au stand
                    newStand.appendChild(standNameElement);
                // Créer un élément pour le nom du stand


    }

    const standID = `${currentStandID++}`;
    newStand.id = standID;

    setStandAttributes(newStand, type);

    // Set initial rotation to 0
    newStand.setAttribute('data-rotation', '0');
    document.getElementById('market').appendChild(newStand);

    addStandToList(newStand);
    
}

function createStandTypeButtons() {
    let name = null;
    const marketWidth = parseInt(marketWidthInput.value);
    const marketHeight = parseInt(marketHeightInput.value);
    if (isNaN(marketWidth) ||isNaN(marketHeight)  ||marketWidth <= 0 || marketHeight <= 0) {
        alert('Please enter the size of the room first!');
        return;
    }
    const buttonList = document.getElementById('buttonList');
  
    while (name === null) {
        name = prompt('Type of the new stand you want to create?');
        if (name === null) {
            // Handle the cancel action, for example, by breaking the loop or taking some other action
            console.log('Stand creation cancelled.');
            return; // Exit the function if cancelled
        } else if (!name) {
            alert('Please enter a valid name.');
            name = null; // Reset name to null to continue the loop
        }
    }
    

    const button = document.createElement('button');
    button.innerText = name;
    button.style.padding = '10px';
    buttonList.appendChild(button);
    console.log("name: " + name);
    button.onclick = () => addStand(name);
}

//create small-medium-large button when the page is loaded
window.onload = function() {
    predefinedStandTypes.forEach(type => {
        const button = document.createElement('button');
        button.innerText = type;
        button.style.padding = '10px';
        document.getElementById('buttonList').appendChild(button);
        button.onclick = () => addStand(type);
    });
};



// A "Définir" gomb eseménykezelője
function initialize() {
    const width = marketWidthInput.value;
    const height = marketHeightInput.value;

    if ((width > 0 && width < 101)&&(height > 0 && height < 101)) {
        market.style.width = width*10 + 'px';
        market.style.height = height*10 + 'px';
        marketSizeText.textContent = `width: ${width}meter, height: ${height}meter`;
    } else {
        marketSizeText.textContent = 'The interval for the stand is 1-100!';
    }
}




//TODOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO modifie the value of the stand
function setStandAttributes(stand, type) {
    let widht=marketWidthInput.value;
    let height=marketHeightInput.value
    switch (type) {

        // obtain the size of stand from the database and multiply by the ration
        case 'large':
            stand.style.width =widht+'px';
            stand.style.height =height+'px';
            console.log("width: " + stand.style.width);
            stand.style.background = 'red';
            stand.color = 'red';
            break;
        case 'medium':
            stand.style.width = widht+'px';
            stand.style.height = height+'px';
            stand.style.background = 'yellow';
            stand.color = 'red';
            break;
        case 'small':
            stand.style.width = widht+'px';
            stand.style.height = height+'px';
            stand.style.background = 'green';
            stand.color = 'red';
            break;
            
        default:
            console.log('yolo');
    }
}

// Function to add a stand to the list


function removeStand(stand) {
    // Supprimer l'élément stand du marché
    stand.remove();

    // Appeler la fonction pour supprimer le stand de la base de données
    deleteStandByID(stand.id);

    console.log('All Stands:', allStands);

    const listItems = document.querySelectorAll('#standsList li');
    listItems.forEach(item => {
        // Construire la chaîne à rechercher
        const searchString = `ID: ${stand.id}`;
        console.log("searchString: " + searchString);
    
        // Vérifier si l'élément de liste contient cette chaîne spécifique
        if (item.innerText.includes(searchString)) {
            console.log("item: " + item.innerText);

            item.remove();
        }
    });
    

    console.log("listItems: " + listItems);

}

    // Supprimer le stand de la liste HTML


    
function addStandToList(stand) {
    const type = stand.getAttribute('data-type');
    const standDetails = {
        Name: stand.getAttribute('data-name'),
        Type: type,
        ID: stand.id,
        X: stand.style.left,
        Y: stand.style.top,
        Rotation: stand.getAttribute('data-rotation'),
        Color: stand.color,
    };

    // Si le stand est un type personnalisé, ajouter sa couleur, largeur et hauteur
    if (customStandTypes && customStandTypes[type]) {
        standDetails.Color = customStandTypes[type].color;
        standDetails.Width = customStandTypes[type].width;
        standDetails.Height = customStandTypes[type].height;
    }

    // Imprimer les détails du stand dans la console
    console.log('Stand Details:', standDetails);

    // Ajouter le stand à la liste globale
    allStands.push(standDetails);
    console.log('All Stands:', allStands);

    const standInfo = `Nom: ${stand.getAttribute('data-name')}, Type: ${stand.getAttribute('data-type')}, ID: ${stand.id}, X: ${stand.style.left}, Y: ${stand.style.top}, Rotation: ${stand.getAttribute('data-rotation')}`;
    const listItem = document.createElement('li');
    listItem.innerText = standInfo;

    const deleteCrossForList = document.createElement('span');
    stand.getAttribute('id')
    
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
    //const listStand = document.getElementById('standsList');
    const listItems = document.querySelectorAll('#standsList li');
    listItems.forEach(item => {
        console.log(item.innerText);//ou console.log(item);
    });

}

document.getElementById("sendDataBtn").addEventListener("click", function() {
    fetch('http://localhost:3000/clear-stands', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    })
    console.log("data clear");
    allStands.forEach(stand => {
        const dataToSend = {
            ID: stand.ID, // ou générer un nouvel ID si nécessaire
            Event_ID: "test"/* Votre ID d'événement ici */,
            Color: stand.Color,
            Name: stand.Name,
            Rotation: stand.Rotation,
            Type: stand.Type,
            Width: stand.Width,
            Height: stand.Height,
            X_position: stand.X, // Assurez-vous que cela correspond à 'X_position'
            Y_position: stand.Y  // Assurez-vous que cela correspond à 'Y_position'
        };
        console.log("data to sens"+dataToSend);

        fetch('http://localhost:3000/save-stand', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend)
        })
        .then(response => response.json())
        .then(data => console.log('Succès:', data))
        .catch((error) => console.error('Erreur:', error));
    });
});




// Function to update the position of a stand in the list

function updateStandPositionInList(stand) {
    const listItems = document.querySelectorAll('#standsList li');
    const standId = stand.getAttribute('id');
    updateStandAttributes(standId, { X: stand.style.left , Y: stand.style.top});

    listItems.forEach(item => {
        // Extract ID from item's innerText
        const itemIdMatch = item.innerText.match(/ID: (\S+),/);
        const itemId = itemIdMatch ? itemIdMatch[1] : null;

        if (itemId === standId) {
            console.log("stand id: " + standId);
            const name = stand.getAttribute('data-name');
            const type = stand.getAttribute('data-type');
            let updatedText;

            updatedText = `Nom: ${name}, Type: ${type}, ID: ${standId}, X: ${stand.style.left}, Y: ${stand.style.top}, Rotation: ${stand.getAttribute('data-rotation')}`;
            
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
    console.log("rotation stand avant clique:" +currentRotation);
   
    // Calculate the new rotation value (toggle between 0 and 90 degrees)
    const newRotation = (currentRotation + 90) % 180;
    updateStandAttributes(stand.getAttribute('id'), { Rotation: newRotation.toString() });
    console.log("rotation stand apres clique:" +newRotation);

    
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
    stand.Rotation = newRotation.toString();
    
    displayListStand();

}

function updateStandAttributes(standID, newAttributes) {
    // Trouver le stand avec l'ID correspondant
    let stand = allStands.find(s => s.ID == standID);
    console.log("Id of modified stand : " + standID);
    

    // Vérifier si le stand existe
    if (stand) {
        // Mettre à jour les attributs
        for (let key in newAttributes) {
            if (stand.hasOwnProperty(key)) {
                stand[key] = newAttributes[key];
            }
        }
    } else {
        console.log("Stand non trouvé");
    }
}
function deleteStandByID(standID) {
    // Trouver l'index du stand avec l'ID correspondant
    const index = allStands.findIndex(s => s.ID == standID);

    // Vérifier si le stand existe
    if (index !== -1) {
        // Supprimer le stand de la liste
        allStands.splice(index, 1);
        console.log("Stand supprimé avec l'ID : " + standID);
    } else {
        console.log("Stand non trouvé pour l'ID : " + standID);
    }
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



