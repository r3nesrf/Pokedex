const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn");
let URL = "https://pokeapi.co/api/v2/pokemon/";
let pokemons = [];
let pag = 1;
const porPag = 20;
const paginacion = document.querySelector("#paginacion");

async function cogerPokemon(){
    try{
        for (let i = 1; i <= 151; i++) {
            // const axios = require('axios');
            const respuesta = await axios.get(URL + i);
            pokemons.push(respuesta.data);
        }
        pokemonPorPagina(pag);
        botonesPaginacion();
    
        } catch (e) {console.error ("Error", e);}
    
    }

function pokemonPorPagina(pagina){
    listaPokemon.innerHTML = "";
    let primero = (pagina - 1) * porPag;
    let ultimo = pagina * porPag;
    const pokemonTotal = pokemons.slice(primero, ultimo);
    pokemonTotal.forEach(pokemon => tarjetasPokemon(pokemon));
}

function tarjetasPokemon(poke) {
    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
        <div class="pokeimg">
            <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
        </div>
        <div class="info">
            <div class="propio">
                <p class="id">#${poke.id}</p>
                <h2 class="nombre">${poke.name}</h2>
            </div>
        </div>
    `;

    div.addEventListener("click", () => {
        window.location.href = `pagina.html?id=${poke.id}`;
    });
   listaPokemon.append(div);

    
}

function botonesPaginacion() {
    paginacion.innerHTML = "";

    if(pag > 1) {
        const anterior = document.createElement("button");
        anterior.textContent = "←";
        anterior.id = "anterior";
        anterior.addEventListener("click", () => {
            pag--;
            pokemonPorPagina(pag);
            botonesPaginacion();
        });
        paginacion.appendChild(anterior);
    }

    if(pag < Math.round(pokemons.length / porPag)) {
        const siguiente = document.createElement("button");
        siguiente.textContent = "→";
        siguiente.id = "siguiente";
        siguiente.addEventListener("click", () => {
            pag++;
            pokemonPorPagina(pag);
            botonesPaginacion();
        });
        paginacion.appendChild(siguiente);
    }
    
}

botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;

    listaPokemon.innerHTML = "";

    for (let i = 1; i <= 151; i++) {
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => {

                if(botonId == "todos") {
                    tarjetasPokemon(data);
                } else {
                    const tipos = data.types.map(type => type.type.name);
                    if (tipos.some(tipo => tipo.includes(botonId))) {
                        tarjetasPokemon(data);
                    }
                }

            })
    }
}))


cogerPokemon();
// function abrirVentana(poke){

// const informacion = document.getElementById("pagina");

// informacion.innerHTML =  `<p>hola</p>`;

// window.location.href = "pagina.html";

// }


// {/* <div class="tipos">
// ${tipos}
// </div>
// <div class="stats">
// <p class="stat">${poke.height}m</p>
// <p class="stat">${poke.weight}kg</p>
// </div> */}