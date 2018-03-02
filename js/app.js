const $form = $('#form-search');
const $searchInput = $('#search-input');
const $containerPokemon = $('#container-pokemon');
let $searchInputText;

$form.submit(function (e) {
    e.preventDefault();
    $containerPokemon.html('');
    $searchInputText = $searchInput.val();
    getPokemons();
})

function getPokemons() {
    $.ajax({
        url: 'https://pokeapi.co/api/v2/pokedex/1/'
    }).done(searchPokemonData).fail(failPoke);
}

function searchPokemonData(element) {
    const pokemonsInfo = element.pokemon_entries;
    pokemonsInfo.forEach((element, index) => {
       if(index < 50){
         const pokemons = element.pokemon_species;
         let apiPokeUrl = pokemons.url;
         let pokeName = pokemons.name;
         let apiPokeEnpoint = `${apiPokeUrl}?q=${pokeName}`;
         paintPokemon(pokeName, apiPokeEnpoint);
       }      
    });
}

function paintPokemon(pokeName, apiPokeEnpoint) {
    // console.log(pokeName, apiPokeEnpoint);
}


function failPoke() {
    console.log('ERRORRR!!!!!!!');
}