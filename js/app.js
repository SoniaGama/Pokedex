const $form = $('#form-search');
const $searchInput = $('#search-input');
const $containerPokemon = $('#container-pokemon');
let $searchInputText;

// crear funciion de loadpage

function loadPage () {    
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
            let pokeName = pokemons.name; 
            let apiPokeUrl = pokemons.url;
            
            const pokeObj = {
                name: pokeName,
                url: apiPokeUrl
            }
            return pokeObj;           
              
    });  
    paintPokemon(pokeInfoObj)
    return pokeInfoObj;
}

function paintPokemon(pokeInfoObj) { //esta funcion debe recibir la función de data como variable
    console.log(pokeInfoObj);
    

    //  let output = ``;
    // output += `
    //      <section class="row">
    //          <div class="card" style="width: 18rem;">
    //             <img class = "card-img-top" src="https://dummyimage.com/200x200" alt="Pokemon">
    //             <div class="card-body">
    //                <h5 class="card-title">${pokeName}</h5>
    //                <a href="${apiPokeEnpoint}" class="card-link"> Card link </a>
    //             </div>
    //          </div>
    //      </section>
    // `      
    // // Revisar output 
    // $containerPokemon.html(output);
}


function failPoke() {
    console.log('ERRORRR!!!!!!!');
}

$(document).ready(loadPage);