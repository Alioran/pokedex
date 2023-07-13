//IIFE
let pokemonRepository = (function () {
    let pokemonList = [];

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
        button.innerText = `No.${index+1}: ${pokedexEntry.name}`;
        //Add class to the button
        button.classList.add("pokemon-item");
        //Add click event listener to button
        button.addEventListener('click', function(){
            showListDetails(pokedexEntry);
        });

        //Append button to list item
        listItem.appendChild(button);
        //Append list item to the list
        list.appendChild(listItem);
    };

    //Check entry
    function showListDetails(pokedexEntry){
        console.log(pokedexEntry);
    };

    return {
        add: add,
        getAll: getAll,
        addListItem : addListItem
    };
})();

//Add Items
pokemonRepository.add({ name: "Bulbasaur", type: ["Grass", "Poison"], height: 2.04 });
pokemonRepository.add({ name: "Ivysaur", type: ["Grass", "Poison"], height: 3.03 });
pokemonRepository.add({ name: "Venausaur", type: ["Grass", "Poison"], height: 6.07 });
pokemonRepository.add({ name: "Charmander", type: ["Fire"], height: 2.00 });
pokemonRepository.add({ name: "Charmeleon", type: ["Fire"], height: 3.07 });
pokemonRepository.add({ name: "Charizard", type: ["Fire", "Flying"], height: 5.07 });
pokemonRepository.add({ name: "Squirtle", type: ["Water"], height: 1.08 });
pokemonRepository.add({ name: "Wartortle", type: ["Water"], height: 3.03 });
pokemonRepository.add({ name: "Blastoise", type: ["Water"], height: 5.03 });

//Check list items
//console.log(pokemonRepository.getAll());

//Add all items in the repository into the list
pokemonRepository.getAll().forEach(function (pokedexEntry, index) {
    pokemonRepository.addListItem(pokedexEntry, index);
});