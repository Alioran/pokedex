let pokemonList = [
    {name: "Bulbasaur", type: ["Grass","Poison"], height: 2.04},
    {name: "Charmander", type: ["Fire",null], height: 2.00},
    {name: "Squirtle", type: ["Water",null], height: 1.08}
];

let writeOut = "";
let arrayLength = pokemonList.length;
console.log(arrayLength);

for (var i=0; i<arrayLength; i++){
    writeOut = writeOut + (`Name: ${pokemonList[i].name}, Type: ${pokemonList[i].type[0]}`);
    if (pokemonList[i].type[1] != null){
        writeOut = writeOut + (` and ${pokemonList[i].type[1]}`);
    };
    writeOut = writeOut + (`, Height: ${pokemonList[i].height} <br>`);
};

document.write(writeOut);