const $form = $('#form-search');
const $searchInput = $('#search-input');
const $containerPokemon = $('#container-pokemon');
let $searchInputText;
// https: //pokeapi.co/api/v2/pokemon/554/ images y habilidades


const failPoke = () => {
    console.log('ERROR!');
}




const getDataModal = (element, item) => {
    // console.log(element, item);
    const captureRate = element.capture_rate;
    const color = element.color.name;
    const habitat = element.habitat.name;
    const shape = element.shape.name;
    const id = element.id;
    const name = element.name;

    const weight = item.weight;
    const height = item.height;
    console.log(height);
    

    const abilities = item.abilities;
    console.log(abilities);    
    // https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeId}.png
}

const getImages = (id) => {
    $.ajax({
        url: `https://pokeapi.co/api/v2/pokemon/${id}`
    }).done(getDataModal).fail(failPoke);
}

const getJsonModal = (e) => {
    const id = e.target.dataset.id;
    $.ajax({
        url: `https://pokeapi.co/api/v2/pokemon-species/${id}/`        
    }).done(getDataModal).fail(failPoke);
    getImages(id);
}

const paintPokemon = (pokeInfoObj) => { //esta funcion debe recibir la función de data como variable
    let output = ``;
    pokeInfoObj.forEach(element => {
        let pokeName = element.name;
        let pokeId = element.id;
        output += `    
                <div class="card-deck float-left mt-3 mr-1 ml-1">
                    <div class="card border">
                        <button data-id="${pokeId}" type="button" class="modal-button btn" data-toggle="modal" data-target="#info-pokemon">
                            <img data-id="${pokeId}" class="card-img-top" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeId}.png" alt="PokeImage">
                        </button>                        
                        <div class="card-body">
                            <h6 class="card-title text-center">${pokeName}</h6>                                                
                        </div>
                    </div>                   
                </div>
                `
    });
    $containerPokemon.html(output);
    $('.modal-button').click(getJsonModal);
}

function pokemonData(element) {
    // console.log( element, item);

    const pokemonsInfo = element.pokemon_entries;
    let pokeInfoObj = pokemonsInfo.map(element => {

        const pokemons = element.pokemon_species;
        const pokeObj = {
            name: pokemons.name,
            id: element.entry_number
        }
        return pokeObj;
    });
    // getImages(pokeInfoObj.id);
    paintPokemon(pokeInfoObj);
}

const getPokemons = () => {
    $.ajax({
        url: 'https://pokeapi.co/api/v2/pokedex/1/'
    }).done(pokemonData).fail(failPoke);

}

const loadPage = () => {
    getPokemons();
};

$(document).ready(loadPage);