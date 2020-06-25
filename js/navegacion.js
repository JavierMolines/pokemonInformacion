function cargar_navegacion() {

    try {

        var navegacion = document.createElement("nav");
        navegacion.setAttribute("id", "contenedor_buscar_pokemon");
        navegacion_no_logueado(navegacion);
        document.body.insertBefore(navegacion, document.body.firstChild);

    } catch (error) { console.log(`El error es: ${error}`); }

}

async function navegacion_no_logueado(navegador) {

    var contenedor_no_logeado = document.createElement("div");
    contenedor_no_logeado.setAttribute("id", "contenedor_sin_login");

    for (let contador = 0; contador < 2; contador++) {

        let presionar = document.createElement("button");
        let flujo = "";

        if (contador === 0) {

            presionar.setAttribute("id", "iniciar_sesion");
            presionar.innerHTML = await obtener_nombre_application("navegacionBotonNoLogueadoA");
            flujo = "iniciar_sesion_flujo";

        } else if (contador === 1) {

            presionar.setAttribute("id", "registrarse");
            presionar.innerHTML = await obtener_nombre_application("navegacionBotonNoLogueadoB");
            flujo = "registrarse_flujo";

        }

        presionar.onclick = () => {

            crear_popup(flujo);

        };

        presionar.classList.add("botones_no_login");
        contenedor_no_logeado.appendChild(presionar);

    }

    navegador.appendChild(contenedor_no_logeado);

}

async function navegacion_logueado(navegador, usuario) {

    let color_fondo_ambos = generar_colores_hexadecimal();
    var elemento_pokemons = document.createElement("div");
    var contenedor_logeado = document.createElement("div");
    var conte_titulo = document.createElement("div");
    var contenedor_titulos_iniciales = document.createElement("div");
    var titulo_nombre_persona = document.createElement("h2");
    var titulo_pagina = document.createElement("h1");
    var contenedor_dirrecciones = document.createElement("div");

    contenedor_titulos_iniciales.setAttribute("id", "contenedor_informacion_principal");
    contenedor_logeado.setAttribute("id", "contenedor_logeado");
    elemento_pokemons.setAttribute("id", "contenedor_informacion_pokemon");
    contenedor_dirrecciones.setAttribute("id", "contenedor_direcciones_total");
    conte_titulo.setAttribute("id", "contenedor_menu_informacion");
    titulo_nombre_persona.setAttribute("id", "titulo_nombre_login");
    titulo_pagina.setAttribute("id", "titulo_presentacion_pagina");
    document.body.appendChild(elemento_pokemons);

    contenedor_titulos_iniciales.appendChild(titulo_pagina);
    contenedor_titulos_iniciales.appendChild(titulo_nombre_persona);
    conte_titulo.appendChild(contenedor_titulos_iniciales);
   
    conte_titulo.style.backgroundColor = color_fondo_ambos;
    contenedor_logeado.appendChild(conte_titulo);
    titulo_nombre_persona.innerHTML = await obtener_nombre_application("tituloPrincipalConTemplate") + usuario.toLocaleUpperCase();
    titulo_pagina.innerHTML = await obtener_nombre_application("nombrePropositoPagina");

    for (let contador = 0; contador < 4; contador++) {
        if (contador === 0 || contador === 1) {
            continue;
        }

        let direccion = document.createElement("i");
        direccion.addEventListener("click", (evento)=>{
            evento.preventDefault();
            return false;
        }, false);

        switch (contador) {
            case 0:
                direccion.innerHTML = await obtener_nombre_application("navegacionLogueadoBotonProximamente");
                break;
            case 1:
                direccion.innerHTML = await obtener_nombre_application("navegacionLogueadoBotonProximamente");
                break;
            case 2:
                direccion.classList.add("fa");
                direccion.classList.add("fa-search");
                direccion.addEventListener("click", (evento)=>{
                    let validar_existencia = document.getElementById("contenedor_filtro_pokemon");
                    if (validar_existencia == null || validar_existencia == undefined) {
                        crear_filtro_pokemon();
                    } else {
                        eliminar_popup_buscador();
                    }
                    //evento.preventDefault();
                    return false;
                }, false);
                break;
            case 3:
                direccion.classList.add("fa");
                direccion.classList.add("fa-power-off");
                direccion.addEventListener("click", (evento)=>{
                    cerrar_sesion(document.getElementById("contenedor_logeado"), navegador);
                    //evento.preventDefault();
                    return false;
                }, false);
                break;
            default:
                break;
        }

        contenedor_dirrecciones.appendChild(direccion);

    }

    conte_titulo.appendChild(contenedor_dirrecciones);

    try {

        let contenedor_no_logueado_existencia = document.getElementById("contenedor_sin_login");

        if (contenedor_no_logueado_existencia !== null) {

            navegador.removeChild(document.getElementById("contenedor_sin_login"));
            
        }
        
    } catch (error) {console.log(`Error: ${error}`)}

    navegador.appendChild(contenedor_logeado);

}

function validar_continuacion_crear_popup(flujo) {

    try {

        var flex_pricipales = [document.getElementById("contenedor_login_validacion"), document.getElementById("contenedor_registrar_validacion")];

        if (flujo === "iniciar_sesion_flujo") {
            if (flex_pricipales[0] === null) {
                if (flex_pricipales[1] !== null) {
                    document.body.removeChild(flex_pricipales[1]);
                    return false;
                }
            } else {
                return true;
            }
        } else if (flujo === "registrarse_flujo") {
            if (flex_pricipales[1] === null) {
                if (flex_pricipales[0] !== null) {
                    document.body.removeChild(flex_pricipales[0]);
                    return false;
                }
            } else {
                return true;
            }
        }
        
    } catch (error) {}
    
}