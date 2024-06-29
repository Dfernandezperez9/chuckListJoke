const BOTON = document.getElementById("fetchJoke");
const CONTENEDOR = document.getElementById("jokeList");


const SAVE = () => { 
    let contenido = document.getElementById('jokeList').innerHTML; 
    localStorage.setItem('contenido', contenido); 
} 

const LOAD = () => { 
    let valorGuardado = localStorage.getItem('contenido'); 
    if(valorGuardado) { 
        document.getElementById('jokeList').innerHTML = valorGuardado; 
    } 
}

const TRAER_BROMA = async () => {
    
    try {
        const RESPONSE = await fetch("https://api.chucknorris.io/jokes/random");
        if (!RESPONSE.ok) {
            throw new Error (`Ha habido un error en el envio, ${RESPONSE.status}`);
        }
        else {
            const DATA = await RESPONSE.json();
            let plantilla = `<div class='nuevaBroma'>
                                <li class='nuevoElemento'>
                                    <p class='nuevoParrafo'>${DATA.value}</p>
                                    <button type='button' onClick="ELIMINAR_DIV(this)" class='nuevoBoton'>Eliminar</button>
                                </li>
                            </div>`

            CONTENEDOR.innerHTML += plantilla;
            SAVE()
        }
    }
    catch (error) {
        console.log(`Ha habido un error en la llegada de los datos, ${error}`);
    }
}

const ELIMINAR_DIV = (elemento) => {
    elemento.closest('.nuevaBroma').remove();
    SAVE()
}

BOTON.addEventListener("click", () => {
    TRAER_BROMA();
})
    

LOAD()