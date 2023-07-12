let pokemonList = [
    {name: "Bulbasaur", type: ["Grass","Poison"], height: 2.04},
    {name: "Ivysaur", type: ["Grass","Poison"], height: 3.03},
    {name: "Venausaur", type: ["Grass","Poison"], height: 6.07},
    {name: "Charmander", type: ["Fire"], height: 2.00},
    {name: "Charmeleon", type: ["Fire"], height: 3.07},
    {name: "Charizard", type: ["Fire", "Flying"], height: 5.07},
    {name: "Squirtle", type: ["Water"], height: 1.08},
    {name: "Wartortle", type: ["Water"], height: 3.03},
    {name: "Blastoise", type: ["Water"], height: 5.03}
];

for (var i=0; i<pokemonList.length; i++){
    //Pokemon Name and Pokedex No.
    document.write(`<b>No.${i+1}: ${pokemonList[i].name}</b><br>`);

    //Pokemon Typing
    document.write(`Type: ${pokemonList[i].type[0]}`);
    //Only write second type if it exists
    if (pokemonList[i].type[1] !== undefined){
        document.write(` and ${pokemonList[i].type[1]}`);
    };
    //Break after type block
    document.write(`<br>`);

    //Pokemon Height
    document.write(`Height: ${pokemonList[i].height}`);
    //If Pokemon is taller than the average person height of 5.6
    if (pokemonList[i].height > 5.6){
        document.write(` (Taller than the average trainer!)`);
    };

    //Put two breaks after the whole Pokemon stat block
    document.write(`<br><br>`);
};