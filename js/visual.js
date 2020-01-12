function crear_contenido_visual(arreglo_contenido) {
    try {
        var contenedor_principal = document.getElementById("contenedor_informacion_pokemon");
        var contenedor_pokemon = document.createElement("div");
        var titulo_pokemon = document.createElement("h4");
        var imagen_pokemon = document.createElement("img");

        let campoNumero = document.getElementById("destroyer");
        let numero = parseInt(campoNumero.value);

        titulo_pokemon.innerHTML = arreglo_contenido[1];
        titulo_pokemon.style.color = "white";

        imagen_pokemon.src = arreglo_contenido[2][1];
        contenedor_pokemon.setAttribute('id', `pokemon${arreglo_contenido[0]}`);

        agregar_evento_hover(contenedor_pokemon);

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

            }, 500);

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

async function detalles_pokemon(pokemon_identificador) {

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
    let arregloNombresBotonesAcordeon = await obtener_nombre_application("arregloTextosAcordeon");
    acordeon_especificaciones(pokemon_identificador, contenedor_detalles, arregloNombresBotonesAcordeon);

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

function acordeon_especificaciones(pokemon_identificador, contenedor_enviar_elementos, nombres_extraidos) {

    for (let contador = 0; contador < nombres_extraidos.length; contador++) {

        if (contador == 0 || contador == 1) {

            let etiqueta_mostrar = document.createElement("h2");
            etiqueta_mostrar.innerHTML = `${nombres_extraidos[contador]} : ${pokemon_identificador[contador]}`;
            if (contador == 1) {
                etiqueta_mostrar.innerHTML = `${nombres_extraidos[contador]} : ${pokemon_identificador[3]}`;
            }
            contenedor_enviar_elementos.appendChild(etiqueta_mostrar);
            
        } else {

            let contenedor_identificacion_tecnica = document.createElement("button");
            let contenedor_info = document.createElement("div");

            switch (contador) {
                case 2:
                    for (let interno_contador = 0; interno_contador < pokemon_identificador[4].length; interno_contador++) {
                        let etiqueta_info = document.createElement("p");
                        etiqueta_info.innerHTML = pokemon_identificador[4][interno_contador];
                        contenedor_info.appendChild(etiqueta_info);
                    }
                    break;
                case 3:
                    for (let interno_contador = 0; interno_contador < pokemon_identificador[5].length; interno_contador++) {
                        let etiqueta_info = document.createElement("p");
                        etiqueta_info.innerHTML = pokemon_identificador[5][interno_contador];
                        contenedor_info.appendChild(etiqueta_info);
                    }
                    break;
                case 4:
                    for (let interno_contador = 0; interno_contador < pokemon_identificador[6].length; interno_contador++) {
                        let etiqueta_info = document.createElement("p");
                        etiqueta_info.innerHTML = pokemon_identificador[6][interno_contador];
                        contenedor_info.appendChild(etiqueta_info);
                    }
                    break;
                case 5:
                    for (let interno_contador = 0; interno_contador < pokemon_identificador[7].length; interno_contador++) {
                        let etiqueta_info = document.createElement("p");
                        etiqueta_info.innerHTML = pokemon_identificador[7][interno_contador];
                        contenedor_info.appendChild(etiqueta_info);
                    }
                    break;
                case 6:
                    for (let interno_contador = 0; interno_contador < pokemon_identificador[8].length; interno_contador++) {
                        let etiqueta_info = document.createElement("p");
                        etiqueta_info.innerHTML = pokemon_identificador[8][interno_contador];
                        contenedor_info.appendChild(etiqueta_info);
                    }
                    break;
                default:
                    break;
            }

            contenedor_identificacion_tecnica.innerHTML = nombres_extraidos[contador];
            contenedor_identificacion_tecnica.onclick = () => {
                let visibilidad = contenedor_identificacion_tecnica.nextSibling;
                if (visibilidad.style.maxHeight){
                    visibilidad.style.maxHeight = null;
                } else {
                    visibilidad.style.maxHeight = visibilidad.scrollHeight + "px";
                } 
            };
            contenedor_enviar_elementos.appendChild(contenedor_identificacion_tecnica);
            contenedor_enviar_elementos.appendChild(contenedor_info);

        }

    }

}

function crear_filtro_pokemon() {

    let buscador_pokemon = document.createElement("div");
    let titulo_filtro = document.createElement("h3");
    let campo_pokemon_id = document.createElement("input");
    let listBoxSelector = document.createElement("select");
    let opciones_rango = ["Seleccione Modo Busqueda", "Por ID (Busca todos en adelante)", "Por Nombre (Busca solo el pokemon ingresado)"];
    let boton_filtro = document.createElement("button");

    buscador_pokemon.setAttribute("id", "contenedor_filtro_pokemon");
    buscador_pokemon.appendChild(titulo_filtro);
    titulo_filtro.style.textAlign = "center";
    titulo_filtro.innerHTML = "Buscador Pokemon";
    campo_pokemon_id.disabled = true;
    campo_pokemon_id.setAttribute("id", "destroyer");
    campo_pokemon_id.setAttribute("type", "text");
    campo_pokemon_id.setAttribute("autocomplete", "off");
    campo_pokemon_id.setAttribute("placeholder", "");
    campo_pokemon_id.setAttribute("title", "IDs permitidos solo del 1 al 151");
    campo_pokemon_id.addEventListener("change", () => {

        if (listBoxSelector.value == "1") {// NUMEROS
            
            let numero_enviar = validar_expresion_regular_solo_numeros(campo_pokemon_id.value);
            if (numero_enviar == "vacio" || numero_enviar < 0 || numero_enviar > 151) {
                console.log("NO PUEDES BUSCAR NUMEROS");
                campo_pokemon_id.value = "";
                boton_filtro.disabled = true;
                boton_filtro.classList.remove("fondo_boton_aceptado");
                return ;
            }

            campo_pokemon_id.value = numero_enviar;

        } else if(listBoxSelector.value == "2"){// TEXTO

            let texto_enviar = validar_expresion_regular_solo_texto(campo_pokemon_id.value);
            if (texto_enviar == 0) {
                console.log("NO PUEDES BUSCAR TEXTOS");
                campo_pokemon_id.value = "";
                boton_filtro.disabled = true;
                boton_filtro.classList.remove("fondo_boton_aceptado");
                return ;
            }

            campo_pokemon_id.value = texto_enviar;
        }

        boton_filtro.classList.add("fondo_boton_aceptado");
        boton_filtro.disabled = false;

    });
    listBoxSelector.setAttribute("id", `list_box`);
    listBoxSelector.classList.add("select_filtro_pokemon");
    listBoxSelector.addEventListener("change", () => {

        campo_pokemon_id.value = "";
        if (listBoxSelector.value != "0") {
            campo_pokemon_id.disabled = false;
        } else {
            campo_pokemon_id.disabled = true;
            boton_filtro.disabled = true;
            boton_filtro.classList.remove("fondo_boton_aceptado");
        }

    });
    for (let contador = 0; contador < opciones_rango.length; contador++) {
        var opcionesListBox = document.createElement("option");
        opcionesListBox.innerHTML = opciones_rango[contador];
        opcionesListBox.value = contador;
        listBoxSelector.appendChild(opcionesListBox);
    }
    boton_filtro.innerHTML = "Buscar";
    boton_filtro.disabled = true;
    boton_filtro.setAttribute("id", "boton_buscar_pokemon");
    boton_filtro.addEventListener("click", verificar_existencia);

    buscador_pokemon.appendChild(listBoxSelector);
    buscador_pokemon.appendChild(campo_pokemon_id);
    buscador_pokemon.appendChild(boton_filtro);
    document.body.appendChild(buscador_pokemon);

}

function generar_colores_hexadecimal() {

    var numero_hexadecimal  = "#";
    var array_minimo_maximo = [16, 1];

    for (let contador = 0; contador < 6; contador++) {

        var numero = parseInt(Math.random() * (array_minimo_maximo[0] - array_minimo_maximo[1]) + array_minimo_maximo[1]);
        numero_hexadecimal += numero.toString(16);

    }

    return numero_hexadecimal;
    
}
