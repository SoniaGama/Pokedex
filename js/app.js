// revisar localStorage para evitar error 504
// revisar error, modales se cierran solos

// siguientes alcances:
// corregir errores
// usar localstorage
// pasar a fetch
// busqueda keyup 

const $container = $('#container-pokemon');

const $form = $('#form-search');
// const $searchInput = $('#search-input');
let $searchInputText;

const failPoke = () => {
    console.log('¡ERROR!');
};

const paintInfoModal = objModal => {
    // revisar unidades de medida de peso y altura            
    let output = ``;
    output = `
        <section class="modal" id="info-pokemon" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${objModal.name}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="${objModal.imagePoke}" alt="image-poke">
                            </div>
                            <div class="col-md-8 ml-auto">
                                <div class="card text-white bg-info mb-3" style="max-width: 18rem;">                                    
                                    <div class="card-body">
                                        <section>
                                            <h6>Abilities:</h6>                                            
                                            <p>${objModal.abilities}</p>
                                            <h6>Capture Rate:</h6> 
                                            <p>${objModal.captureRate}</p>
                                            <h6>Color:</h6> 
                                            <p>${objModal.color}</p>                                          
                                            <h6>Shape:</h6> 
                                            <p>${objModal.shape}</p>
                                            <h6>Weight:</h6> 
                                            <p>${objModal.weight}</p>
                                            <h6>Height:</h6> 
                                            <p>${objModal.height}</p>                                          
                                        </section>
                                    </div>                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
    $('#dinamic-modal').html(output);
    //   <h6>Habitat:</h6> 
    //   <p>${objModal.habitat}</p>
};

const getDataModal = (element, item) => {
    const id = element.id;
    const objModal = {
        id: id,
        name: element.name,
        captureRate: element.capture_rate,
        color: element.color.name,
        // habitat: element.habitat.name,  revisar para los elementos que tiene null en esta propiedad
        shape: element.shape.name,
        weight: item.weight,
        height: item.height,
        abilities: item.abilities.map(abilityItem => abilityItem.ability.name).join(', '),
        imagePoke: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
    }    
    paintInfoModal(objModal);
};

const getJsonModal = e => {
    const id = e.target.dataset.id;

    const pokeInfo = $.ajax({
        url: `https://pokeapi.co/api/v2/pokemon-species/${id}/`,
        async: true
    });

    const pokeInfoComplete = $.ajax({
        url: `https://pokeapi.co/api/v2/pokemon/${id}`,
        async: true
    });

    $.when(pokeInfo, pokeInfoComplete).done((element, item) => {
        getDataModal(element[0], item[0]);
    }).fail(failPoke);   
};

const paintPokemon = pokeInfoObj => { //esta funcion debe recibir la función de data como variable
    let output = ``;
    pokeInfoObj.forEach(element => {
        output += `    
                <div class="card-deck float-left mt-3 mr-1 ml-1">
                    <div class="card border">
                    <button data-id="${element.id}" type="button" class="modal-button btn" data-toggle="modal" data-target="#info-pokemon">
                        <img data-id="${element.id}" class="card-img-top" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${element.id}.png" alt="PokeImage">
                    </button>            
                        <div class="card-body">               
                            <h6 id="button-info" class="card-title text-center">${element.name}</h6>  
                        </div>
                    </div>                   
                </div>
                `
    });
    $container.html(output);
    // $('#search-input').keyup(SearchForName);
    $('.modal-button').click(getJsonModal);
};

const pokemonData = element => {
    const pokemonsInfo = element.pokemon_entries;
    let pokeInfoArray = pokemonsInfo.map(element => {
        const pokemons = element.pokemon_species;
        const pokeObj = {
            name: pokemons.name,
            id: element.entry_number
        }
        return pokeObj;
    });
    paintPokemon(pokeInfoArray);
}

const getPokemons = () => {
    $.ajax({
        url: 'https://pokeapi.co/api/v2/pokedex/1/'
    }).done(pokemonData).fail(failPoke);

};

const loadPage = () => {    
    getPokemons();
};

$(document).ready(loadPage);