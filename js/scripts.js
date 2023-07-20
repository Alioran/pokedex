//IIFE for pokemon
let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

    //Puts the pokemon onto the list of pokemon
    function add(pokemon) {
        pokemonList.push(pokemon);
    };

    //Gets all entries listed in the pokedex
    function getAll() {
        return pokemonList;
    };

    //Load pokemon from API
    function loadList() {
        //check if url returns a promise
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {   //if returned, then continue with function
            //for every pokemon passed through, create array with name and details
            json.results.forEach(function (item) {
                let pokemon = {
                    //Take first letter of name and capitalize it, 
                    //then add the rest of the letters 
                    name: item.name.charAt(0).toUpperCase() + item.name.slice(1),
                    detailsUrl: item.url,
                };
                //add pokemon onto pokemonList
                add(pokemon);
            });
        }).catch(function (e) { //If no promise is resolved, return error
            console.error(e);
        })
    };

    //Put the item in the pokemonList onto the page
    function addListItem(pokedexEntry, index) {
        //Find list in document and set to a variable
        let list = document.querySelector(".list");

        //Create list item
        let listItem = document.createElement("li");
        //Create button in the list item
        let button = document.createElement("button");
        //Create image for sprite
        let imgSprite = document.createElement("img");

        //Add text in button for Pokedex Number and Pokemon Name
        //button.innerText = `No.${index + 1}: ${pokedexEntry.name}`;
        button.innerHTML = `No.${index + 1}: `;
        switch(pokedexEntry.name){
            case "Nidoran-f":
                button.innerHTML += `${pokedexEntry.name.replace("-f", "&#9792;")}`;
                break;
            case "Nidoran-m":
                button.innerHTML += `${pokedexEntry.name.replace("-m", "&#9794;")}`;
                break;
            case "Mr-mime":
                button.innerHTML += `${pokedexEntry.name.replace("-m", ". M")}`;
                break;
            default:
                button.innerHTML += `${pokedexEntry.name}`;
        };
        //Add class to the button
        button.classList.add("pokemon-item");
        //Add click event listener to button
        button.addEventListener('click', function () {
            showListDetails(pokedexEntry);
        });

        //give the sprite a class
        imgSprite.classList.add("sprite");

        //Append button to list item
        listItem.appendChild(button);
        //Append list item to the list
        list.appendChild(listItem);
        //Append image into the button
        button.appendChild(imgSprite);
        //Load the sprite URL into the src for the image
        loadSprite(pokedexEntry).then(function (spriteUrl) {
            imgSprite.src = spriteUrl;
        });
    };


    //Load the details of pokemon
    function loadDetails(pokemon) {
        let url = pokemon.detailsUrl;  //set url variable to the link listed in detailsUrl
        return fetch(url).then(function (response) {    //check if it returns a promise
            return response.json();
        }).then(function (details) {    //if returned, then continue with function
            //Find artwork, height, and typing and set it to keys
            pokemon.imageUrl = details.sprites.other['official-artwork'].front_default;
            pokemon.height = details.height / 10; //PokeAPI lists height in decimeters, so it needs to be divided by 10
            pokemon.weight = details.weight / 10; //same with weight
            pokemon.number = details.id
            pokemon.types = details.types;
            //Map an array out for base stats
            pokemon.baseStats = details.stats.map(function(stat){
                return {
                    name: stat.stat.name.toUpperCase().replace("-"," "), //return the stat name
                    //the name is changed to all uppercase and the dashes replaced with space
                    value: stat.base_stat//return the base stat from each index
                };
            });

            //I got help for this
            return fetch(details.species.url); //grab the url of the species from details
        }).then(function (response) {
            return response.json(); //check if it returns a promise
        }).then(function (speciesData) {
            //Grab the genus in english
            //The arrow is the same as function that has genera as the input
            //The find function is using the output of the function which is returning something
            //the inside of the function is equivalent to "return genera.language.name === 'en'"
            //then using the found index to grab the genus
            pokemon.genus = speciesData.genera.find(genera => genera.language.name === 'en').genus;

        }).catch(function (e) { //If no promise is resolved, return error
            console.error(e);
        });
    };

    //specifically for loading the sprite image on the list
    function loadSprite(pokedexEntry) {
        return fetch(pokedexEntry.detailsUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (details) {
                return details.sprites.versions['generation-viii'].icons.front_default;
            })
            .catch(function (e) {
                console.error(e);
            });
    };

    //Check entry
    function showListDetails(pokedexEntry) {
        loadDetails(pokedexEntry).then(function () {
            listModal.showModal(pokedexEntry);
            console.log(pokedexEntry);
        });
    };

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails
    };
})();















// //IIFE for modal
let listModal = (function () {
    //Function for showing the modal
    function showModal(pokedexEntry) {
        //find the modal container and assign it to variable
        let modalContainer = document.querySelector('#modal-container');

        // Clear all existing modal content
        modalContainer.innerHTML = '';






        //Structure Creation
        //create new div for modal
        let modal = document.createElement('div');
        modal.classList.add('modal');

        //Create modal header
        let modalHeader = document.createElement('div');
        modalHeader.classList.add('modal-header');

        //Create close button
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);

        //Create modal content
        let modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');

        //Create modal container and image
        let modalImageContainer = document.createElement('div');
        modalImageContainer.classList.add('modal-image');
        let modalImage = document.createElement('img');
        modalImage.src = pokedexEntry.imageUrl;

        //Create modal title AKA Entry No. and Pokemon Name
        let titleElement = document.createElement('h1');
        //titleElement.innerText = `No.${pokedexEntry.number}: ${pokedexEntry.name}`;
        titleElement.innerHTML = `No.${pokedexEntry.number}: `;
        switch(pokedexEntry.name){
            case "Nidoran-f":
                titleElement.innerHTML += `${pokedexEntry.name.replace("-f", "&#9792;")}`;
                break;
            case "Nidoran-m":
                titleElement.innerHTML += `${pokedexEntry.name.replace("-m", "&#9794;")}`;
                break;
            case "Mr-mime":
                titleElement.innerHTML += `${pokedexEntry.name.replace("-m", ". M")}`;
                break;
            default:
                titleElement.innerHTML += `${pokedexEntry.name}`;
        };
        titleElement.classList.add('modal-title');

        //Create div for content info
        let modalInfo = document.createElement('div');
        modalInfo.classList.add('modal-content__info');

        //Create subtitle for genus
        let subtitle = document.createElement('div');
        subtitle.innerText = pokedexEntry.genus;
        subtitle.classList.add('subtitle');


        //Create height class
        let height = document.createElement('div');
        height.innerHTML = `Height: ${pokedexEntry.height}m<br>Weight: ${pokedexEntry.weight}kg`;
        height.classList.add('height');






        //Append all the items 
        modalContainer.appendChild(modal);

        modal.appendChild(modalHeader);
        modal.appendChild(modalContent);

        modalHeader.appendChild(closeButtonElement);

        modalContent.appendChild(modalImageContainer);
        modalContent.appendChild(modalInfo);

        modalImageContainer.appendChild(modalImage);

        modalInfo.appendChild(titleElement);
        modalInfo.appendChild(subtitle);

        //need to create typing element here so we can use the
        //for each for each function so it can accomodate for
        //the single or double typing of pokemon
        pokedexEntry.types.forEach(function (typeObj) {
            let typeName = typeObj.type.name.charAt(0).toUpperCase() + typeObj.type.name.slice(1);
            //console.log(type);
            let typingLabel = document.createElement('div');
            typingLabel.innerText = typeName;
            typingLabel.classList.add('type', typeName);
            modalInfo.appendChild(typingLabel);
        });

        modalInfo.appendChild(height);

        let baseStatTitle = document.createElement('h2');
        baseStatTitle.innerText = "BASE STATS"
        modalInfo.appendChild(baseStatTitle);
        //Add each base stat, same as typing function
        pokedexEntry.baseStats.forEach(function(statObj){
            let statblock = document.createElement('div');
            statblock.innerHTML = `<b>${statObj.name}</b>: ${statObj.value}`;
            modalInfo.appendChild(statblock);
        });

        //add class to make it visible
        modalContainer.classList.add('is-visible');






        modalContainer.addEventListener('click', (e) => {
            // Since this is also triggered when clicking INSIDE the modal
            // We only want to close if the user clicks directly on the overlay
            let target = e.target;
            if (target === modalContainer) {
                hideModal();
            }
        });
    }

    //select the show-modal id (attached to the button)
    // document.querySelector('#show-modal').addEventListener('click', () => {
    //     showModal('No.6 Charizard', 'Flame Pokemon', 'Fire', 'Flying', 1.7, 'https://archives.bulbagarden.net/media/upload/3/38/0006Charizard.png');
    // });

    //hide modal after input
    function hideModal() {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');
    }
    window.addEventListener('keydown', (e) => {
        let modalContainer = document.querySelector('#modal-container');
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });

    return {
        showModal: showModal
    }

})();


















//Load data
pokemonRepository.loadList().then(function () {
    //Add all items in the repository into the list
    pokemonRepository.getAll().forEach(function (pokedexEntry, index) { //go through each entry
        pokemonRepository.addListItem(pokedexEntry, index); //and then add that item to the list
    });
});


