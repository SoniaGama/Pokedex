const $form = $('#form-search');
const $searchInput = $('#search-input');
const $containerPokemon = $('#container-pokemon');
let $searchInputText;

// crear funciion de loadpage

function loadPage () {    
    $containerPokemon.html('');   
    getPokemons();
}

function getPokemons() {
    $.ajax({
        url: 'https://pokeapi.co/api/v2/pokedex/1/'
    }).done(pokemonData).fail(failPoke);
}

// revisar la funcion de data, crar un obeto y guardar en una variable
function pokemonData(element) {   
    const pokemonsInfo = element.pokemon_entries;   
   
    pokemonsInfo.forEach((element, index) => {
        // console.log(element);
        
        if (index < 50) {
            const pokemons = element.pokemon_species;
            let apiPokeUrl = pokemons.url;
            let pokeName = pokemons.name;
            // let apiPokeEnpoint = `${apiPokeUrl}?q=${pokeName}`;
            console.log(pokeName, apiPokeUrl);            
            paintPokemon(pokeName, apiPokeUrl);            
        }
    });     
}

function paintPokemon(pokeName, apiPokeEnpoint) {//esta funcion debe recibir la función de data como variable 
     let output = ``;
    output += `
         <section class="row">
             <div class="card" style="width: 18rem;">
                <img class = "card-img-top" src="https://dummyimage.com/200x200" alt="Pokemon">
                <div class="card-body">
                   <h5 class="card-title">${pokeName}</h5>
                   <a href="${apiPokeEnpoint}" class="card-link"> Card link </a>
                </div>
             </div>
         </section>
    `      
    // Revisar output 
    $containerPokemon.html(output);
}

function failPoke() {
    console.log('ERRORRR!!!!!!!');
}

$(document).ready(loadPage);