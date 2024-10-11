const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn");
let URL = "https://pokeapi.co/api/v2/pokemon/";
let i = 1;

for (i; i <= 20; i++) {
    fetch(URL + i)
        .then((response) => response.json())
        .then(data =>tarjetasPokemon(data))
}

function tarjetasPokemon(poke) {
 
    let cont = 0;
    let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);//función map para recorrer array tipos
    tipos = tipos.join('');//cadena de texto con lo de antes


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
        abrirVentana(poke);});
 
    listaPokemon.append(div);

    
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

// function abrirVentana(poke){

//     const informacion = document.getElementById("pagina");

//     informacion.innerHTML =  `<p>hola</p>`;

//     window.location.href = "pagina.html";

// }


// {/* <div class="tipos">
// ${tipos}
// </div>
// <div class="stats">
// <p class="stat">${poke.height}m</p>
// <p class="stat">${poke.weight}kg</p>
// </div> */}