const $container = $('#container-pokemon');

const $form = $('#form-search');
// const $searchInput = $('#search-input');
let $searchInputText;

const failPoke = () => {
    console.log('¡ERROR!');
};

const paintInfoModal = objModal => {
    let outputTitle = `<h5 class="modal-title">${capitalize(objModal.name)}</h5>`;
    let outputImg = `<img src="${objModal.imagePoke}" alt="image-poke">`;
    let outputCharacteristics = `
                    <table class="table styles-modal">
                        <thead class='styles-modal'>
                            <tr class='table-primary'>
                                <th class='styles-modal' scope="col">Abilities</th>
                                <th class='styles-modal' id="font-little" scope="col">Capture Rate</th>
                                <th class='styles-modal' scope="col">Color</th>                                
                            </tr>
                        </thead>
                        <tbody>
                            <tr class='table-primary'>
                                <td scope="row">${capitalize(objModal.abilities)}</td>
                                <td>${objModal.captureRate}</td>
                                <td>${capitalize(objModal.color)}</td>
                                
                            </tr>                            
                        </tbody>
                    </table>
                    <table class="table styles-modal">
                        <thead class='styles-modal'>
                            <tr class='table-primary'>
                                <th class='styles-modal' scope="col">Weight</th>
                                <th class='styles-modal' scope="col">Height</th>
                                <th class='styles-modal' scope="col">Shape</th>                                                                              
                            </tr>
                        </thead>
                        <tbody>
                            <tr class='table-primary'>
                                <td scope="row">${objModal.weight}</td>
                                <td>${objModal.height}</td>
                                <td>${capitalize(objModal.shape)}</td>                                           
                            </tr>                            
                        </tbody>
                    </table>
    `;
    $('#title').html(outputTitle);
    $('#img').html(outputImg);
    $('#characteristic').html(outputCharacteristics);
};

const getDataModal = (element, item) => {
    // console.log(element);
    
    const id = element.id;
    let objModal = {
        id: id,
        name: element.name,
        captureRate: element.capture_rate,
        color: element.color.name,       
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

const paintPokemon = pokeInfoObj => { 
    let output = ``;
    pokeInfoObj.forEach(element => {
        output += `    
                <div class="card-deck float-left mt-3 mr-1 ml-1">
                    <div class="card border">
                    <button data-id="${element.id}" type="button" class="modal-button btn card-btn" data-toggle="modal" data-target="#info-pokemon">
                        <img data-id="${element.id}" class="card-img-top" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${element.id}.png" alt="PokeImage">
                    </button>            
                        <div class="card-body">               
                            <h6 id="button-info" class="card-title text-center">${capitalize(element.name)}</h6>  
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

    localStorage.setItem('pokemonData', JSON.stringify(pokemonsInfo));
    const pokeData = JSON.parse(localStorage.getItem('pokemonData'));

    let pokeInfoArray = pokeData.map(element => {
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

const capitalize = (str) => {
    var newStr = str.split(" ");
    var result = [];
    newStr.forEach(function (palabra) {
        var primerLetra = palabra.charAt(0).toUpperCase();
        var mediaPalabra = palabra.slice(1, palabra.length);
        result.push(primerLetra + mediaPalabra);
    });
    return result.join(" ");
};

$(document).ready(loadPage);