//IIFE
let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    //Puts the pokemon onto the list of pokemon
    function add(pokemon) {
        pokemonList.push(pokemon);
    };

    //Gets all entries listed in the pokedex
    function getAll() {
        return pokemonList;
    };

    //Put the item in the pokemonList onto the page
    function addListItem(pokedexEntry, index) {
        //Find list in document and set to a variable
        let list = document.querySelector(".list");

        //Create list item
        let listItem = document.createElement("li");
        //Create button in the list item
        let button = document.createElement("button");

        //Add text in button for Pokedex Number and Pokemon Name
        button.innerText = `No.${index + 1}: ${pokedexEntry.name}`;
        //Add class to the button
        button.classList.add("pokemon-item");
        //Add click event listener to button
        button.addEventListener('click', function () {
            showListDetails(pokedexEntry);
        });

        //Append button to list item
        listItem.appendChild(button);
        //Append list item to the list
        list.appendChild(listItem);
    };

    //Check entry
    function showListDetails(pokedexEntry) {
        loadDetails(pokedexEntry).then(function () {
            console.log(pokedexEntry);
          });
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
                    //get sprite of pokemon for the list
                    //sprite: item.url.sprites.front_default
                };
                //add pokemon onto pokemonList
                add(pokemon);
            });
        }).catch(function (e) { //If no promise is resolved, return error
            console.error(e);
        })
    };

    //Load the details of pokemon
    function loadDetails(pokemon) {
        let url = pokemon.detailsUrl;  //set url variable to the link listed in detailsUrl
        return fetch(url).then(function (response) {    //check if it returns a promise
            return response.json();
        }).then(function (details) {    //if returned, then continue with function
            //Find sprite, height, and typing and set it to keys
            pokemon.imageUrl = details.sprites.front_default;
            pokemon.height = details.height;
            pokemon.types = details.types;
        }).catch(function (e) { //If no promise is resolved, return error
            console.error(e);
        });
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails
    };
})();

//Load data
pokemonRepository.loadList().then(function () {
    //Add all items in the repository into the list
    pokemonRepository.getAll().forEach(function (pokedexEntry, index) {
        pokemonRepository.addListItem(pokedexEntry, index);
    });
});
