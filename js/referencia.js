const githubRequest = new XMLHttpRequest();
githubRequest.onload = addUser;
githubRequest.open('GET', `https://api.github.com/users/${searchedUser}`);
githubRequest.send();

function addUser() {
    const user = JSON.parse(this.responseText);
    const firstImage = data.results[0];

    userContainer.insertAdjacentHTML('afterbegin', `<div class="card col-md-6 offset-md-3 col-xs-12">
        <img class="card-img-top" src="${user.avatar_url}" alt="Card image cap">
        <div class="card-body">
        <h5 class="card-title">${user.name || ''}</h5>
        <h6>@${user.login}</h6>
        <p class="card-text">${user.bio || ''}</p>
        <a href="${user.html_url}" class="btn btn-primary">Stalkear coder</a>
        </div>
    </div>`);
}

$.ajax({
    url: `https://api.github.com/users/${searchedUser}`
}).done(addUser);

function addUser(user) {
    $userContainer.html(`<div class="card col-md-6 offset-md-3 col-xs-12">
        <img class="card-img-top" src="${user.avatar_url}" alt="Card image cap">
        <div class="card-body">
        <h5 class="card-title">${user.name || ''}</h5>
        <h6>@${user.login}</h6>
        <p class="card-text">${user.bio || ''}</p>
        <a href="${user.html_url}" class="btn btn-primary">Stalkear coder</a>
        </div>
    </div>`);
}

var jqxhr = $.ajax("example.php")
    .done(function () {
        alert("success");
    })
    .fail(function () {
        alert("error");
    })
    .always(function () {
        alert("complete");
    });

jQuery.get(), hace una petición tipo GET a través de HTTP.
jQuery.getJSON(), hace una petición tipo GET a través de HTTP pero a diferencia de la anterior, la respuesta siempre está en formato JSON.
jQuery.getScript(), hace una petición tipo GET a través de HTTP espera un archivo JavaScript que se pueda ejecutar luego.
jQuery.post(), hace una petición tipo POST a través de HTTP 
.load(), hace una petición tipo GET a través de HTTP pero el response obtenido es un archivo HTML que se inserta dentra del selector que precede a este método.

Pseudocodigo

// traemos elementos
const miElemento = $('#miId');

$elemento.evento(funcion (e){
    e.preventDefaul();
    contenedor.html('');
    elementoInput = input.val();
    funcionGet();
})

function funcionGet() {
    $.ajax({
        url: 'http//url${elementoInpt}'
    }).done(funcionQueCreaElementos)
    .fail(funcionDeControlDeErores);
}

function funcionQueCreaElementos(elementos){
    const elementos = elementos.reposnse.docs;

    elementos.forEach(funcion(element){
        extremos eleentos del JSON

        pintamos con dom
    })
}

funcion funcionDeControlDeErores(){
    console.log('error');    
}



