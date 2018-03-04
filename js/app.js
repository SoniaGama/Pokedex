const $form = $('#form-search');
const $searchInput = $('#search-input');
const $containerPokemon = $('#container-pokemon');
let $searchInputText;

function dataModal (event) { 
    e.preventDefault();    
    let endpointModal = event.target;
    console.log(endpointModal);    
}

const paintPokemon = (pokeInfoObj) => { //esta funcion debe recibir la función de data como variable
    let output = ``;
    pokeInfoObj.forEach(element => {
        let pokeName = element.name;
        let apiPokeUrl = element.url;
        let pokeId = element.id;
        output += `    
                <div class="card-deck float-left mt-3 mr-1 ml-1">
                    <div class="card border">
                        <button data-url="${apiPokeUrl}" type="button" class="btn modal-button" data-toggle="modal" data-target="#info-pokemon">
                            <img class="card-img-top" src="https://dummyimage.com/200x200" alt="Card image cap">
                        </button>                        
                        <div class="card-body">
                            <h5 class="card-title">${pokeName}</h5>
                            <a href="${apiPokeUrl}" class="card-link" target="_blank">link</a>                        
                        </div>
                    </div>                   
                </div>
                `
    });
    $containerPokemon.html(output);
}

const failPoke = () => {
    console.log('ERROR!');
}

const pokemonData = (element) => {
    const pokemonsInfo = element.pokemon_entries;
    
    let pokeInfoObj = pokemonsInfo.map(element => {      
       
            const pokeId = element.entry_number;
            const pokemons = element.pokemon_species;
          
            const pokeObj = {
                name: pokemons.name,
                url: pokemons.url           
            }        
            
        return pokeObj;
    });
    paintPokemon(pokeInfoObj)
}

const getPokemons = () => {
    $.ajax({
        url: 'https://pokeapi.co/api/v2/pokedex/1/'
    }).done(pokemonData).fail(failPoke);
}

function loadPage () {
    $containerPokemon.html('');
    getPokemons();    
    $('.modal-button').click(dataModal);
};


$(document).ready(loadPage);