var pokemones = [];
var pokemonSeleccionado1 = {};
var pokemonSeleccionado2 = {};


var master = [];
var masterSeleccionado1 = {};
var indiceMasterSeleccionado1 = null;
var masterSeleccionado2 = {};
var indiceMasterSeleccionado2 = null;

function obtenerMaster(){
    fetch('http://localhost:3002/pokemon-masters', {
    method: 'GET',
    headers: {
        "Content-Type": "application/json",
        }
    })
    .then((respuesta) => respuesta.json())
    .then((res) => {
        master = res;//l
        console.log(master);
        llenarPlayer1();
        llenarPlayer2()
    }); 
}

obtenerMaster();

function llenarPlayer1(){    
    for(let i=0; i<master.length; i++){
        document.getElementById('seleccion-player1').innerHTML += `<option value="${i}">${master[i].firstName}</option>`;
    }
}

function llenarPlayer2(){    
    for(let i=0; i<master.length; i++){
        document.getElementById('seleccion-player2').innerHTML += `<option value="${i}">${master[i].firstName}</option>`;
    }
}

function cambiarUsuario1(){
    let url = document.getElementById("seleccion-player1").value;
    let aux = master[url];
     indiceMasterSeleccionado1 = url;
    fetch(`http://localhost:3002/pokemon-masters/${master[url]._id}`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
    }
    })
    .then((respuesta) => respuesta.json())
    .then((pokemons) => {
        masterSeleccionado1 = pokemons;
        cambiarUsuario1Aux(aux, masterSeleccionado1);
    });
}

function cambiarUsuario2(){
    let url = document.getElementById("seleccion-player2").value;
    let aux = master[url];
    indiceMasterSeleccionado2 = url;

    fetch(`http://localhost:3002/pokemon-masters/${master[url]._id}`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
    }
    })
    .then((respuesta) => respuesta.json())
    .then((pokemons) => {
        masterSeleccionado2 = pokemons;
        cambiarUsuario2Aux(aux, masterSeleccionado2);
    });
}

function cambiarUsuario1Aux(aux, master){
    document.getElementById('pokemones-master1').innerHTML = ``
    document.getElementById('imagen-master1').setAttribute('src', `${aux.img}`);
    document.getElementById('nombre-master1').innerHTML = `${aux.firstName}`;
    document.getElementById('nivel-master1').innerHTML = `${aux.level}`;

    for(let i=0; i<master.pokemons.length; i++){
        document.getElementById('pokemones-master1').innerHTML += `<img src="${master.pokemons[i].img}" onclick="seleccionarPokkemon1('${master.pokemons[i]._id}')"></img>`
    }
}

function cambiarUsuario2Aux(aux, master){
    document.getElementById('pokemones-master2').innerHTML = ``
    document.getElementById('imagen-master2').setAttribute('src', `${aux.img}`);
    document.getElementById('nombre-master2').innerHTML = `${aux.firstName}`;
    document.getElementById('nivel-master2').innerHTML = `${aux.level}`;

    for(let i=0; i<master.pokemons.length; i++){
        document.getElementById('pokemones-master2').innerHTML += `<img src="${master.pokemons[i].img}" onclick="seleccionarPokkemon2('${master.pokemons[i]._id}')"></img>`
    }
}


function seleccionarPokkemon1(pokemon){ 
    fetch(`http://localhost:3002/pokemones/${pokemon}`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
    }
    })
    .then((respuesta) => respuesta.json())
    .then((pokemons) => {
        pokemonSeleccionado1 = pokemons;
        seleccionarPokkemon1Aux(pokemonSeleccionado1);
        activarBoton()
    });
    
}

function seleccionarPokkemon1Aux(pokemon){
    document.getElementById('imagen-pokkemon1').setAttribute('src', `${pokemon.img}`);
    document.getElementById('nombre-pokkemon1').innerHTML = `${pokemon.name}`;

    let tipos = ``;

    for(let i=0; i<pokemon.type.length; i++){
        tipos += `<span class="badge small text-bg-success">${pokemon.type[i]}</span>`;
    }

    document.getElementById('tipo-pokkemon1').innerHTML = ` <span class="small">Tipos:</span> ${tipos}`;

    let debilidades = ``;

    for(let i=0; i<pokemon.weaknesses.length; i++){
        debilidades += `<span class="badge small text-bg-danger">${pokemon.weaknesses[i]}</span>`;
    }

    document.getElementById('debilidades-pokkemon1').innerHTML = ` <span class="small">Debilidades:</span> ${debilidades}`;
}



function seleccionarPokkemon2(pokemon){ 
    fetch(`http://localhost:3002/pokemones/${pokemon}`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
    }
    })
    .then((respuesta) => respuesta.json())
    .then((pokemons) => {
        pokemonSeleccionado2 = pokemons;
        seleccionarPokkemon2Aux(pokemonSeleccionado2);
        activarBoton()
    });
    
}

function seleccionarPokkemon2Aux(pokemon){
    document.getElementById('imagen-pokkemon2').setAttribute('src', `${pokemon.img}`);
    document.getElementById('nombre-pokkemon2').innerHTML = `${pokemon.name}`;

    let tipos = ``;

    for(let i=0; i<pokemon.type.length; i++){
        tipos += `<span class="badge small text-bg-success">${pokemon.type[i]}</span>`;
    }

    document.getElementById('tipo-pokkemon2').innerHTML = ` <span class="small">Tipos:</span> ${tipos}`;

    let debilidades = ``;

    for(let i=0; i<pokemon.weaknesses.length; i++){
        debilidades += `<span class="badge small text-bg-danger">${pokemon.weaknesses[i]}</span>`;
    }

    document.getElementById('debilidades-pokkemon2').innerHTML = ` <span class="small">Debilidades:</span> ${debilidades}`;
}

function mandarDatos(){

    const Aux1 = [{id: master[indiceMasterSeleccionado1]._id, nombre: master[indiceMasterSeleccionado1].firstName, imagen: master[indiceMasterSeleccionado1].img}, {id: pokemonSeleccionado1._id ,nombre: pokemonSeleccionado1.name, tipos: pokemonSeleccionado1.type, debilidades: pokemonSeleccionado1.weaknesses }]
    const Aux2 = [{id: master[indiceMasterSeleccionado2]._id, nombre: master[indiceMasterSeleccionado2].firstName, imagen: master[indiceMasterSeleccionado2].img}, {id: pokemonSeleccionado2._id ,nombre: pokemonSeleccionado2.name, tipos: pokemonSeleccionado2.type, debilidades: pokemonSeleccionado2.weaknesses }]

    const data = {
        arreglo1: Aux1,
        arreglo2: Aux2
    }

    fetch('http://localhost:3002/games', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
      })
    .then((respuesta) => respuesta.json())
    .then((datos) => {
        console.log('Se guardo correctamente', datos)
        mostrarNombreGanador(datos.ganador);
    })
    .catch(error => console.error(error)); 
}

function activarBoton(){
    if(indiceMasterSeleccionado1 !== null && indiceMasterSeleccionado2 !== null && pokemonSeleccionado1 !== {} && pokemonSeleccionado2 !== {}){
        document.getElementById('boton-luchar').disabled = false;
    }
}

function mostrarNombreGanador(ganador){
    if(ganador == ''){
        document.getElementById('nombre-ganador').innerHTML = `Empate`;
    }else{
        document.getElementById('nombre-ganador').innerHTML = `${ganador}`;
    }
}

const abrirModal = document.getElementById("abrirModal");
const modal = document.getElementById("modal");
const cerrar = document.getElementsByClassName("cerrar")[0];

abrirModal.onclick = function() {
  modal.style.display = "block";
  mostrarBatallasAnteriores();
}

cerrar.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


function mostrarBatallasAnteriores(){
    let partidas = []
    fetch('http://localhost:3002/games', {
    method: 'GET',
    headers: {
        "Content-Type": "application/json",
        }
    })
    .then((respuesta) => respuesta.json())
    .then((res) => {
        partidas = res;
        console.log('partidas enteriores', partidas);
        mostrarBatallasAnterioresAux(partidas);
    }); 
}


function mostrarBatallasAnterioresAux(partidas){
    document.getElementById('partias-anteriores').innerHTML =  ``;
    
    let ganador = '';

    partidas.forEach((partida,i )=> {

        if(partida.player1._id == partida.winner){
            ganador = partida.player1.nombre;
        }else if((partida.player2._id == partida.winner)){
            ganador = partida.player2.nombre;
        }else{
            ganador = 'Empate'
        }

        document.getElementById('partias-anteriores').innerHTML +=  `<h3 style="text-align: center; margin-bottom: 10px;">partida numero ${(i+1)}</h3>
                                                                    <div class="contenido"  >
                                                                        <div>
                                                                            <img src="${partida.player1.imagen}">
                                                                            <h4>Player 1<h4>
                                                                            <p>${partida.player1.nombre}</p>
                                                                        </div>
                                                                        <div>
                                                                            <img src="${partida.player2.imagen}" >
                                                                            <h4>Player 2<h4>
                                                                            <p>${partida.player2.nombre}</p>
                                                                        </div>
                                                                        <div>
                                                                            <h4 style="font-size: 30px;">Ganador<h4>
                                                                            <pv style="font-size: 25px; color: #0EF64A">${ganador}</p>
                                                                        </div>
                                                                    </div>`;
    });
    

    

}