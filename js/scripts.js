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
        let list = document.querySelector(".row");

        //Create list item
        let listItem = document.createElement("li");
        $(listItem).addClass("list-group-item col-12 col-md-6 col-lg-4");
        //Create button in the list item
        let button = document.createElement("button");
        button.classList.add("btn");
        $(button).attr("data-bs-toggle","modal");
        $(button).attr("data-bs-target","#modal-container");
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
        //find the modal containers and assign it to variable
        let modalImageContainer = $('.modal-image');
        let modalContent = $('.modal-content__info');
        

        // Clear all existing modal content
        modalImageContainer.empty();
        modalContent.empty();

        // //Create modal container and image
        let modalImage = $(`<img></img>`);
        modalImage.attr("src", pokedexEntry.imageUrl);

        //Create modal title AKA Entry No. and Pokemon Name
        let titleElement = $(`<h1 class="modal-title">No. ${pokedexEntry.number}: `);

        switch(pokedexEntry.name){
            case "Nidoran-f":
                titleElement.html(`${pokedexEntry.name.replace("-f", "&#9792;")}</h1>`);
                break;
            case "Nidoran-m":
                titleElement.html(`${pokedexEntry.name.replace("-m", "&#9794;")}</h1>`);
                break;
            case "Mr-mime":
                titleElement.html(`${pokedexEntry.name.replace("-m", ". M")}</h1>`);
                break;
            default:
                titleElement.html(`${pokedexEntry.name} </h1>`);
        };

        // //Create subtitle for genus
        let subtitle = $(`<div class="subtitle">${pokedexEntry.genus}</div>`);


        // //Create height class
        let height = $(`<div class="height">Height: ${pokedexEntry.height}m<br>Weight: ${pokedexEntry.weight}kg</div>`);






        // //Append all the items 
        modalImageContainer.append(modalImage);

        // modalInfo.appendChild(titleElement);
        modalContent.append(titleElement);
        modalContent.append(subtitle);

        // //need to create typing element here so we can use the
        // //for each for each function so it can accomodate for
        // //the single or double typing of pokemon
        pokedexEntry.types.forEach(function (typeObj) {
            let typeName = typeObj.type.name.charAt(0).toUpperCase() + typeObj.type.name.slice(1);
            //console.log(type);
            let typingLabel = $(`<div class = "type ${typeName}">${typeName}</div>`);
            //typingLabel.addClass('type').addClass(typeName);
            modalContent.append(typingLabel);
        });

        modalContent.append(height);

        let baseStatTitle = $(`<h2>BASE STATS</h2>`);
        //baseStatTitle.innerText = "BASE STATS"
        modalContent.append(baseStatTitle);
        //Add each base stat, same as typing function
        pokedexEntry.baseStats.forEach(function(statObj){
            let statblock = $(`<div><b>${statObj.name}</b>: ${statObj.value}</div>`);
            modalContent.append(statblock);
        });

    }


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


