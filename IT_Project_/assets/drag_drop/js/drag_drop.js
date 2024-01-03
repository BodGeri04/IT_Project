
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
let testt = [];
let scaleFactor = 1; // Facteur d'échelle pour la taille du marché
let idUwU=0;
////Database
let market_height;
let market_witdh;
let small_height;
let small_witdh;
let medium_height;
let medium_witdh;
let large_height;
let large_witdh;


let id; // id of current event
//
function addStand(type,stand,load) {

    const marketWidth = parseInt(marketWidthInput.value);
    const marketHeight = parseInt(marketHeightInput.value);



    const newStand = document.createElement('div');
    newStand.classList.add('stand');
    
    if (load == true) {
        newStand.setAttribute('data-type', stand);
        let color, width, height, name;
        color = type.Color;
        width = type.Width;
        height = type.Height;
        name = stand;

                // Store custom type attributes and name
                customStandTypes[type] = {
                    color: color,
                    width: width,
                    height: height,
                    name: name
                };
    }
    else{
    newStand.setAttribute('data-type', type);
    // Check if type is custom and not previously defined
    if (!predefinedStandTypes.includes(type) && !customStandTypes[type]) {
        let color, width, height, name;
        //console.log("type: " + type);
        while (color === undefined) {
            color = prompt('What color do you want?');
            if (color === null) { // User cancelled the prompt
                //console.log('Stand creation cancelled.');
                return; // Exit the function
            } else if (!color) {
                alert('Please enter a valid color.');
                color = undefined; // Reset to undefined to continue the loop
            }
        }

        while (width === undefined || isNaN(width) || width <= 0) {
            width = prompt('What width do you want?');
            if (width === null) {
                //console.log('Stand creation cancelled.');
                return; // Exit the function
            } else if (!width || isNaN(width) || width <= 0) {
                alert('Please enter a valid width (a positive number).');
                width = undefined; // Reset to continue the loop
            }
        }

        while (height === undefined || isNaN(height) || height <= 0) {
            height = prompt('What height do you want?');
            if (height === null) {
                //console.log('Stand creation cancelled.');
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
    }}

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
    } else if (predefinedStandTypes.includes(type)) {
        // For predefined types, ask for the name each time
        let name = undefined;
        while (name === undefined) {
            name = prompt('Name of the stand?');
            if (name === null) {
                //console.log('Stand creation cancelled.');
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

    const standID = `${idUwU++}`;
    newStand.id = standID;

    setStandAttributes(newStand, type);

    // Set initial rotation to 0
    newStand.setAttribute('data-rotation', '0');
    document.getElementById('market').appendChild(newStand);

    addStandToList(newStand);

}

function createStandTypeButtons() {
    let name = null;


    const buttonList = document.getElementById('buttonList');

    while (name === null) {
        name = prompt('Type of the new stand you want to create?');
        if (name === null) {
            // Handle the cancel action, for example, by breaking the loop or taking some other action
            //console.log('Stand creation cancelled.');
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
    //console.log("name: " + name);
    button.onclick = () => addStand(name);
}

//create small-medium-large button when the page is loaded
window.onload = function () {
    predefinedStandTypes.forEach(type => {
        const button = document.createElement('button');
        button.innerText = type;
        button.style.padding = '10px';
        document.getElementById('buttonList').appendChild(button);
        button.onclick = () => addStand(type);
    });
};





function setStandAttributes(stand, type) {
    console.log("scaleFactorrr: " + scaleFactor);
    //console.log("width: " + market_witdh + "height: " + market_height);
    switch (type) {
        
        // obtain the size of stand from the database and multiply by the ration
        case 'large':
            stand.style.width = large_witdh * scaleFactor + 'px';
            stand.style.height = large_height * scaleFactor + 'px';
            console.log("width: " + large_witdh * scaleFactor + "height: " + large_height * scaleFactor);
            stand.style.background = 'red';
            stand.color = 'red';
            break;
        case 'medium':
            stand.style.width = medium_witdh * scaleFactor + 'px';
            stand.style.height = medium_height * scaleFactor + 'px';
            console.log("width: " + medium_witdh * scaleFactor + "height: " + medium_height * scaleFactor);
            stand.style.background = 'yellow';
            stand.color = 'yellow';
            break;
        case 'small':
            stand.style.width = small_witdh * scaleFactor + 'px';
            stand.style.height = small_height * scaleFactor + 'px';
            console.log("width: " + small_witdh * scaleFactor + "height: " + small_height * scaleFactor);
            stand.style.background = 'green';
            stand.color = 'green';
            break;

        default:
            var currentWidth = parseFloat(stand.style.width);
            var currentHeight = parseFloat(stand.style.height);
            stand.style.width = currentWidth * scaleFactor + 'px';
   
            stand.style.height = currentHeight * scaleFactor + 'px';
            console.log('not default');
    }
}
function removeStand(standData,fonction) {
    let standElement;
    //console.log(fonction)
    //console.log("standData: " + standData+ standData.ID);
    if (isNaN(standData)== false) {
        console.log("classique data", standData);
        standElement = document.getElementById(standData.toString());
        removeStandFromList(standData);
    }
    else{


    // Récupérer l'élément DOM correspondant au stand à partir de son ID (en tant que chaîne de caractères)
     standElement = document.getElementById(standData.ID.toString());
     removeStandFromList(standData.ID);
    
    }
    //console.log("standElement to remove:", standElement);
    if (standElement) {
        // Supprimer l'élément DOM du stand
        standElement.remove();
    } else {
        console.error("Stand element not found in DOM:", standData.ID);
    }

    // Supprimer le stand de la liste interne et mettre à jour l'affichage
    
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


    allStands.push(standDetails);
    //console.log('All Stands:', allStands);

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

        //console.log("stand to remove id : " + stand.getAttribute('id'));
        fonction="313"
        removeStand(stand.getAttribute('id'),fonction);
    });
    listItem.appendChild(deleteCrossForList);
    document.getElementById('standsList').appendChild(listItem);

}

//display the list of stands
function displayListStand() {
    //const listStand = document.getElementById('standsList');
    const listItems = document.querySelectorAll('#standsList li');
    listItems.forEach(item => {
        //console.log(item.innerText);//ou //console.log(item);
    });

}

document.getElementById("sendDataBtn").addEventListener("click", function () {
    test = id;
    fetch(`http://localhost:3000/clear-stands?eventId=${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    })
    //console.log("data clear");
    allStands.forEach(stand => {
        if (stand.Width === undefined && stand.Type == "small") {
            stand.Width = small_witdh;
            stand.Height = small_height;
        }
        if (stand.Width === undefined && stand.Type == "medium") {
            stand.Width = medium_witdh;
            stand.Height = medium_height;
        }
        if (stand.Width === undefined && stand.Type == "large") {
            stand.Width = large_witdh;
            stand.Height = large_height;
        }
        if(stand.X === undefined){
            stand.X = stand.X_position;
        }
        if(stand.Y === undefined){
            stand.Y = stand.Y_position;
        }
        
        //console.log("stand width: " + stand.Type);
        const dataToSend = {
            ID: stand.ID, // ou générer un nouvel ID si nécessaire
            Event_ID: id/* Votre ID d'événement ici */,
            Color: stand.Color,
            Name: stand.Name,
            Rotation: stand.Rotation,
            Type: stand.Type,
            Width: stand.Width,
            Height: stand.Height,
            X_position: stand.X, // Assurez-vous que cela correspond à 'X_position'
            Y_position: stand.Y  // Assurez-vous que cela correspond à 'Y_position'
        };
        //console.log("data to sens" + dataToSend);

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
    updateStandAttributes(standId, { X: stand.style.left, Y: stand.style.top });

    listItems.forEach(item => {
        // Extract ID from item's innerText
        const itemIdMatch = item.innerText.match(/ID: (\S+),/);
        const itemId = itemIdMatch ? itemIdMatch[1] : null;

        if (itemId === standId) {
            //console.log("stand id: " + standId);
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
                    fonction="413"
                    console.log("stand to remove id : " + stand.getAttribute('id'));
                    removeStand(stand.getAttribute('id'),fonction);

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
        const rect = document.getElementById('market').getBoundingClientRect();
        const x = event.pageX - rect.left - (draggedStand.offsetWidth / 2) + window.scrollX;
        const y = event.pageY - rect.top - (draggedStand.offsetHeight / 2) + window.scrollY;

        // Ellenőrizze a terület határait és ne engedje a standot kilépni a területből
        const maxX = rect.width - draggedStand.offsetWidth;
        const maxY = rect.height - draggedStand.offsetHeight;
        const newX = Math.min(Math.max(0, x), maxX);
        const newY = Math.min(Math.max(0, y), maxY);

        const potentialBox = {
            left: newX,
            right: newX + draggedStand.offsetWidth,
            top: newY,
            bottom: newY + draggedStand.offsetHeight
        };

        let collisionDetected = false;
        standHasBeenMoved = true;

        const allStands = document.querySelectorAll('.stand');
        allStands.forEach(stand => {
            if (stand !== draggedStand) {
                const standBox = getBoundingBox(stand);
                if (isOverlapping(potentialBox, standBox)) {
                    collisionDetected = true;
                    //console.log("Collision detected!");
                }
            }
        });

        if (!collisionDetected) {
            draggedStand.style.left = `${newX}px`;
            draggedStand.style.top = `${newY}px`;
        }
    }
});

function rotateStand(event) {
    // Get the stand element
    const stand = event.target;

    // Get the current rotation value
    const currentRotation = parseInt(stand.getAttribute('data-rotation'));
    //console.log("rotation stand avant clique:" + currentRotation);

    // Calculate the new rotation value (toggle between 0 and 90 degrees)
    const newRotation = (currentRotation + 90) % 180;
    updateStandAttributes(stand.getAttribute('id'), { Rotation: newRotation.toString() });
    //console.log("rotation stand apres clique:" + newRotation);


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
    //console.log("Id of modified stand : " + standID);


    // Vérifier si le stand existe
    if (stand) {
        // Mettre à jour les attributs
        for (let key in newAttributes) {
            if (stand.hasOwnProperty(key)) {
                stand[key] = newAttributes[key];
            }
        }
    } else {
        //console.log("Stand non trouvé");
    }
}
function deleteStandByID(standID) {
    // Trouver l'index du stand avec l'ID correspondant
    const index = allStands.findIndex(s => s.ID == standID);

    // Vérifier si le stand existe
    if (index !== -1) {
        // Supprimer le stand de la liste
        allStands.splice(index, 1);
        //console.log("Stand supprimé avec l'ID : " + standID);
    } else {
        //console.log("Stand non trouvé pour l'ID : " + standID);
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
        //console.log("Stand has been moved");
    }
});
document.getElementById('market').addEventListener('mousedown', function (event) {
    if (event.target.classList.contains('stand')) {
        draggedStand = event.target;

        let initialMouseY = event.clientY;
        let initialStandY = draggedStand.getBoundingClientRect().top + window.scrollY;

        document.addEventListener('mousemove', function (event) {
            if (draggedStand) {
                let newY = initialStandY + event.clientY - initialMouseY - window.scrollY;

                // Try adjusting this offset if the stand is still not aligned properly
                let adjustment = 10; // Adjust this value as needed
                newY -= adjustment;

                draggedStand.style.top = newY + 'px';
            }
        });

        document.addEventListener('mouseup', function mouseupHandler() {
            document.removeEventListener('mousemove');
            document.removeEventListener('mouseup', mouseupHandler);
        });
    }
});






function clearHighlightedItems() {
    const listItems = document.querySelectorAll('#standsList li');
    listItems.forEach(item => {
        item.style.backgroundColor = ''; // Töröljük a háttérszínt az összes listaelemről
    });
}
function highlightListItem(standID) {
    const listItems = document.querySelectorAll('#standsList li');
    listItems.forEach(item => {
        const itemIdMatch = item.innerText.match(/ID: (\S+),/);
        const itemId = itemIdMatch ? itemIdMatch[1] : null;

        if (itemId === standID) {
            item.style.backgroundColor = '#ff9999'; // Példa: Kiemelés sárga színnel
        } else {
            item.style.backgroundColor = ''; // Visszaállítjuk a többi elem színét
        }
    });
}


//when i want to load an event
document.getElementById('saveButton').addEventListener('click', function () {
    let market_witdh_local, market_height_local;
    const selectedEvent = document.getElementById('eventSelect').value;
    document.getElementById('market').innerHTML = '';
    //first we ask database for the dimensions of the market and the small-medium-large stand
    fetch(`http://localhost:3000/getDimensions?eventId=${selectedEvent}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur réseau lors de la récupération des données');
            }
            return response.json();
        })
        .then(data => {


            // Supposons que `data` soit un tableau d'objets, et vous prenez le premier objet
            const dimensions = data[0]; // Adaptez cette ligne si la structure de vos données est différente
            // ask the database for the dimensions of the market 
            market_height = dimensions.market_height;
            small_height = dimensions.small_height;
            medium_height = dimensions.medium_height;
            large_height = dimensions.large_height;
            small_witdh = dimensions.small_width;
            medium_witdh = dimensions.medium_width;
            large_witdh = dimensions.large_width;
            market_height_local = dimensions.market_height;
            market_witdh_local = dimensions.market_width;
            id = dimensions.id;
            market_witdh = dimensions.market_width; // Assurez-vous que le nom de la propriété correspond exactement à celui dans votre réponse
            console.log("width1: " + market_witdh_local + "height: " + market_height_local);
            //console.log("width: " + market_witdh + "height: " + market_height);
            return fetch(`http://localhost:3000/getStands?eventId=${selectedEvent}`);
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur réseau lors de la récupération des stands');
            }
            return response.json();
        })
        .then(data => {
           
    //then we ask database for each stand to display them
    // Supposons que `data` est la liste des stands que vous avez reçue
    allStands = []; // Vider la liste au préalable
    let uniqueStands = new Map(); // Créer une nouvelle Map pour les types de stands uniques
    data.forEach(stand => {
        const dataToSend = {
            ID: stand.ID, // Utiliser l'ID existant ou en générer un nouveau si nécessaire
            Event_ID: stand.Event_ID, // Assurez-vous d'avoir cet ID depuis la source appropriée
            Color: stand.Color,
            Name: stand.Name,
            Rotation: stand.Rotation,
            Type: stand.Type,
            Width: stand.Width,
            Height: stand.Height,
            X_position: stand.X_position, // Assurez-vous que cela correspond à la propriété attendue
            Y_position: stand.Y_position  // Assurez-vous que cela correspond à la propriété attendue
        };
        stand.X = stand.X_position;
        stand.Y = stand.Y_position;


            // Ajout de dataToSend à la liste allStands
            allStands.push(dataToSend);
        
        //console.log(dataToSend);

    //obtain all the different type to display the buttons
        if (stand.Type !== 'small' && stand.Type !== 'medium' && stand.Type !== 'large') {
            // Vérifiez si le type de stand est déjà dans la Map
            if (!uniqueStands.has(stand.Type)) {
                // Si non, ajoutez-le avec son width et height
                uniqueStands.set(stand.Type, { Width: stand.Width, Height: stand.Height,Color:stand.Color });
            }
        }

        
    // Si vous voulez voir ce que vous avez dans uniqueStands

    createLoadButtons(uniqueStands);



    });
    
    //we obtain the highest id of the stands to add a new stand with a new id
    let highestID = allStands.reduce((max, stand) => {
        // Convertir l'ID en nombre si ce n'est pas déjà le cas
        const standID = parseInt(stand.ID);
        
        // Comparer avec l'ID maximum actuel
        if (standID > max) {
            return standID;
        } else {
            return max;
        }
    }, 0); // Initialiser à 0 ou à l'ID minimum possible

    idUwU= highestID +1
    //console.log("La valeur de l'ID la plus élevée est :", highestID);
    


    const maxSize = 800; // Taille maximale de l'affichage
    if (market_witdh >= 40 && market_witdh <= 200 && market_height >= 40 && market_height <= 200) {
        const maxDimension = Math.max(market_witdh, market_height);
        scaleFactor = maxSize / maxDimension;
        console.log("scaleFactor: " + scaleFactor);
        
        market.style.width = (market_witdh * scaleFactor) + 'px';
        market.style.height = (market_height * scaleFactor) + 'px';
        console.log("width3: " + market.style.width + "height: " + market.style.height);
        marketSizeText.textContent = `width: ${market_witdh_local} meter, height: ${market_height_local} meter`;
    } else {
        marketSizeText.textContent = 'The interval for the stand is 40-200!';
        //console.log("The interval for the stand is 40-200!");
    }
        //add all the stands to the list and to the market
        addAllStandsToList(scaleFactor);
            })
            .catch(error => console.error('Erreur lors de la récupération des données:', error));
            


   
    

    
    // Traiter les données ici;

});


function createLoadButtons(uniqueStands) {
    const buttonList = document.getElementById('buttonList');

    // Effacer les boutons existants avant d'en ajouter de nouveaux
    buttonList.innerHTML = '';

    predefinedStandTypes.forEach(type => {
        const button = document.createElement('button');
        button.innerText = type;
        button.style.padding = '10px';
        document.getElementById('buttonList').appendChild(button);
        button.onclick = () => addStand(type);
    });


    uniqueStands.forEach((value, type) => { 
         const button = document.createElement('button');
        button.innerText = type; // Utilisez 'type' comme texte du bouton
        button.style.padding = '10px';
        buttonList.appendChild(button);
        
        // Ici, vous pouvez passer soit le 'type', soit l'objet 'value' à la fonction 'addStand'
        button.onclick = () => addStand(value,type,true); // ou addStand(value) selon ce que vous attendez dans addStand
    });
    
}

function addAllStandsToList(scale) {
    // Assurez-vous que la liste des stands est claire avant d'ajouter de nouveaux éléments
    document.getElementById('standsList').innerHTML = '';

    allStands.forEach(stand => {
        // Créer l'élément de la liste pour le stand
        const standInfo = `Nom: ${stand.Name}, Type: ${stand.Type}, ID: ${stand.ID}, X: ${stand.X_position}, Y: ${stand.Y_position}, Rotation: ${stand.Rotation}`;
        //console.log("standInfo: " + standInfo);
        const listItem = document.createElement('li');
        listItem.innerText = standInfo;

        // Créer un bouton ou un élément pour supprimer le stand de la liste
        const deleteCrossForList = document.createElement('span');
        deleteCrossForList.innerText = ' ×';
        deleteCrossForList.style.fontSize = '20px';
        deleteCrossForList.style.color = 'red';
        deleteCrossForList.classList.add('delete-cross-for-list');
        deleteCrossForList.style.cursor = 'pointer';

        deleteCrossForList.addEventListener('click', function () {
            fonction="760"
            removeStand(stand,fonction)
        });

        listItem.appendChild(deleteCrossForList);
        document.getElementById('standsList').appendChild(listItem);
        
        
    });
    addAllStandsFromList(allStands,scale);
}

function removeStandFromList(standId) {
    // Filtrer allStands pour enlever le stand avec l'ID spécifié
    allStands = allStands.filter(stand => stand.ID !== standId);

    // Trouver l'élément <li> correspondant dans la liste des stands et le supprimer
    const standsList = document.getElementById('standsList');
    if (standsList) {
        const listItems = standsList.getElementsByTagName('li');
        for (let item of listItems) {
            if (item.innerText.includes(`ID: ${standId}`)) {
                standsList.removeChild(item);
                break; // Sortir de la boucle une fois l'élément trouvé et supprimé
            }
        }
    }
}


function addAllStandsFromList(standsList,scale) {
    let x=0;
    console.log("function start " + x);
    console.log("listItem: " + standsList.length);
    standsList.forEach(standData => {
        addStandFromData(standData,scale);
        console.log(x++)
    });
}

function addStandFromData(standData,scale) {
    const newStand = document.createElement('div');
    newStand.classList.add('stand');
    newStand.setAttribute('data-type', standData.Type);
    newStand.setAttribute('data-name', standData.Name);
    newStand.id = standData.ID;

    newStand.style.left = `${standData.X_position}px`;
    newStand.style.top = `${standData.Y_position}px`;
    
    newStand.setAttribute('data-rotation', standData.Rotation);



        newStand.style.background = standData.Color;



    // Taille et autres attributs pour les stands personnalisés
        console.log("scaleFactooor: " + scale);
        newStand.style.width = standData.Width*scale + 'px';
        newStand.style.height = standData.Height*scale + 'px';



    // Ajouter l'élément du nom du stand
    const standNameElement = document.createElement('span');
    standNameElement.textContent = standData.Name.substring(0, 4); // Utiliser les 4 premiers caractères du nom
    standNameElement.classList.add('stand-name');

    standNameElement.style.color = 'black'; // Définir la couleur du texte en noir
    standNameElement.style.textAlign = 'center'; // Centrer le texte
    standNameElement.style.display = 'block'; // Assurez-vous que l'élément span se comporte comme un bloc pour permettre le centrage
    standNameElement.style.userSelect = 'none'; // Empêcher la sélection du texte
    standNameElement.style.pointerEvents = 'none'; // Les événements de la souris seront ignorés sur cet élément
    newStand.appendChild(standNameElement);

    // Ajouter les autres attributs nécessaires...

    document.getElementById('market').appendChild(newStand);

}