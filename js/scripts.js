let pokemonRepository = (function(){
    let pokemonList = [];

    function add(pokemon){
        pokemonList.push(pokemon);
    };
    function getAll(){
        return pokemonList;
    };
    return{
        add: add,
        getAll: getAll
    };
})();

pokemonRepository.add({name: "Bulbasaur", type: ["Grass","Poison"], height: 2.04});
pokemonRepository.add({name: "Ivysaur", type: ["Grass","Poison"], height: 3.03});
pokemonRepository.add({name: "Venausaur", type: ["Grass","Poison"], height: 6.07});
pokemonRepository.add({name: "Charmander", type: ["Fire"], height: 2.00});
pokemonRepository.add({name: "Charmeleon", type: ["Fire"], height: 3.07});
pokemonRepository.add({name: "Charizard", type: ["Fire", "Flying"], height: 5.07});
pokemonRepository.add({name: "Squirtle", type: ["Water"], height: 1.08});
pokemonRepository.add({name: "Wartortle", type: ["Water"], height: 3.03});
pokemonRepository.add({name: "Blastoise", type: ["Water"], height: 5.03});

console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function(pokedexEntry, index){
        //Pokemon Name and Pokedex No.
        document.write(`<b>No.${index+1}: ${pokedexEntry.name}</b><br>`);

        //Pokemon Typing
        document.write(`Type: ${pokedexEntry.type[0]}`);
        //Only write second type if it exists
        if (pokedexEntry.type[1] !== undefined){
            document.write(` and ${pokedexEntry.type[1]}`);
        };
        //Break after type block
        document.write(`<br>`);

        //Pokemon Height
        document.write(`Height: ${pokedexEntry.height}`);
        //If Pokemon is taller than the average person height of 5.6
        if (pokedexEntry.height > 5.6){
            document.write(` (Taller than the average trainer!)`);
        };

        //Put two breaks after the whole Pokemon stat block
        document.write(`<br><br>`);
});