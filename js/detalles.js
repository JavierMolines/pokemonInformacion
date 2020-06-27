function crear_contenido_visual(arreglo_contenido) {
    try {

        let timing_await = 500;
        let contenedor_principal = document.getElementById("contenedor_informacion_pokemon");
        let contenedor_pokemon = document.createElement("div");
        let titulo_pokemon = document.createElement("h4");
        let imagen_pokemon = document.createElement("img");
        let campoNumero = document.getElementById("destroyer");
        let numero = parseInt(campoNumero.value);

        contenedor_pokemon.setAttribute('id', `pokemon${arreglo_contenido[0]}`);
        agregar_evento_hover(contenedor_pokemon);

        titulo_pokemon.innerHTML = arreglo_contenido[1];
        titulo_pokemon.style.color = "white";
        imagen_pokemon.src = arreglo_contenido[2][1];

        imagen_pokemon.onload = () => {

            // DETALLES POKEMON
            contenedor_pokemon.addEventListener("click", () => {
                detalles_pokemon(arreglo_contenido);
            });

            contenedor_pokemon.classList.add("presentacion");
            contenedor_pokemon.appendChild(imagen_pokemon);
            contenedor_pokemon.appendChild(titulo_pokemon);
            contenedor_principal.appendChild(contenedor_pokemon);

            setTimeout(() => {

                contenedor_pokemon.style.opacity = 1;
                campoNumero.value = numero + 1;
                validar_buscar_pokemon("nuevo");

            }, timing_await);

        };

    } catch (error) { console.log(error) }
}

function agregar_evento_hover(contenedor_del_pokemon) {

    var color_original = "#4d4d4d";
    var color_nuevo    = generar_colores_hexadecimal();

    contenedor_del_pokemon.style.backgroundColor = color_original;
    contenedor_del_pokemon.addEventListener("mouseenter", ()=> {
        contenedor_del_pokemon.style.backgroundColor = color_nuevo;
    });

    contenedor_del_pokemon.addEventListener("mouseleave", ()=> {
        contenedor_del_pokemon.style.backgroundColor = color_original;
    });
    
}

function detalles_pokemon(pokemon_identificador) {

    var contenedor_principal = document.createElement("div");
    var contenedor_secundario = document.createElement("div");
    var contenedor_detalles = document.createElement("div");
    //var informacion_detallada = [pokemon_identificador, contenedor_secundario];
    var cerrar_button = document.createElement("button");
    var cerrar_etique = document.createElement("i");
    var titulo = document.createElement("h1");
    var imagen = document.createElement("img");

    contenedor_principal.setAttribute("id", `detalles${pokemon_identificador[0]}`);
    contenedor_principal.classList.add("cuadro_principal");
    contenedor_principal.classList.add("modal_cerrada");

    contenedor_detalles.setAttribute("id", "detalles_pokemon_seleccionado");
    //let arregloNombresBotonesAcordeon = await obtener_nombre_application("arregloTextosAcordeon");
    //acordeon_especificaciones(pokemon_identificador, contenedor_detalles, arregloNombresBotonesAcordeon);
    barras_circulares_habilidades(pokemon_identificador, contenedor_detalles);

    titulo.innerHTML = pokemon_identificador[1];
    titulo.setAttribute("id", "nombre_pokemon_seleccionado");
    imagen.src = pokemon_identificador[2][1];
    imagen.setAttribute("id", "imagen_pokemon_seleccionado");

    cerrar_etique.classList.add("fa");
    cerrar_etique.classList.add("fa-power-off");
    cerrar_button.appendChild(cerrar_etique);
    cerrar_button.setAttribute("id", "cerrar_detalles_pokemon");
    cerrar_button.onclick = () => {

        // TRANSITION PARTE 2 CERRAR
        contenedor_principal.classList.replace("modal_abierta", "modal_cerrada");

        // ELIMINAR ELEMENTO
        setTimeout(() => { 
           document.body.removeChild(contenedor_principal);
        }, 500);

    };

    // AGREGAR TODO AL CONTENEDOR
    contenedor_secundario.appendChild(titulo);
    contenedor_secundario.appendChild(cerrar_button);
    contenedor_secundario.appendChild(imagen);
    contenedor_secundario.appendChild(contenedor_detalles);
    contenedor_secundario.setAttribute("id", "contenedor_secundario");

    // AGREGAR DETALLES
    contenedor_principal.appendChild(contenedor_secundario);
    document.body.appendChild(contenedor_principal);

    // TRANSITION PARTE 1 ABRIR
    setTimeout(() => { 
        contenedor_principal.classList.replace("modal_cerrada", "modal_abierta");   
    }, 100);

}