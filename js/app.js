const $form = $('#form-search');
const $searchInput = $('#search-input');
const $containerPokemon = $('#container-pokemon');
let $searchInputText;

// crear funciion de loadpage

function loadPage() {
    $containerPokemon.html('');
    // let dataPokemon = pokemonData(element);
    // paintPokemon(dataPokemon, $containerPokemon);
    getPokemons();
}

function getPokemons() {
    $.ajax({
        url: 'https://pokeapi.co/api/v2/pokedex/1/'
    }).done(pokemonData).fail(failPoke);
}

// revisar la funcion de data, crar un obeto y guardar en una variable
const pokemonData = (element) => {
    const pokemonsInfo = element.pokemon_entries;

    let pokeInfoObj = pokemonsInfo.map((element, index) => {
        const pokemons = element.pokemon_species;

        const pokeObj = {
            name: pokemons.name,
            url: pokemons.url
        }
        return pokeObj;
    });
    paintPokemon(pokeInfoObj, $containerPokemon)
}

function paintPokemon(pokeInfoObj, $containerPokemon) { //esta funcion debe recibir la función de data como variable
    let output = ``;   

    pokeInfoObj.forEach(element => {
        let pokeName = element.name;
        let apiPokeUrl = element.url;
        output += `
         <section class="row">
             <div class="card" style="width: 18rem;">
                <img class = "card-img-top" src="https://dummyimage.com/200x200" alt="Pokemon">
                <div class="card-body">
                   <h5 class="card-title">${pokeName}</h5>
                   <a href="${apiPokeUrl}" class="card-link" target="_blank">Pokemon link</a>
                </div>
             </div>
         </section>
         `
    });
    $containerPokemon.html(output);
}

function failPoke() {
    console.log('ERRORRR!!!!!!!');
}

$(document).ready(loadPage);