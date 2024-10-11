document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => response.json())
        .then(data => {
               
            document.getElementById("nombre").textContent = data.name;
            document.getElementById("imagen").src = data.sprites.other["official-artwork"].front_default;
            document.getElementById("id").textContent = `#${data.id}`;
            document.getElementById("altura").textContent = `${data.height / 10} m`;  
            document.getElementById("peso").textContent = `${data.weight / 10} kg`; 

            let tipos = data.types.map((type) => type.type.name).join(", ")//función map para recorrer array tipos y cadena de texto de lo de antes
            document.getElementById("tipos").textContent = tipos;
        })       
});