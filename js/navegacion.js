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

            crear_popup(flujo, navegador);

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
                        validar_existencia.remove();
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

async function crear_popup(flujo, navegador) {

    var pasaonopasa = validar_continuacion_crear_popup(flujo);

    if (pasaonopasa === true) {

        return;        
        
    }

    var contenedor         = document.createElement("div");
    var usuario            = document.createElement("input");
    var passwor            = document.createElement("input");
    var ingresar           = document.createElement("button");
    var container_usuario  = document.createElement("div");
    var container_password = document.createElement("div");
    var imagen_usuario     = document.createElement("i");
    var imagen_passwor     = document.createElement("i");

    usuario.setAttribute("type", "text");
    passwor.setAttribute("type", "password");

    usuario.setAttribute("autocomplete", "off");
    passwor.setAttribute("autocomplete", "off");

    usuario.setAttribute("placeholder", await obtener_nombre_application("popupGeneradoCamposPlaceHolderUsuario"));
    passwor.setAttribute("placeholder", await obtener_nombre_application("popupGeneradoCamposPlaceHolderPassword"));

    imagen_usuario.classList.add("fa");
    imagen_usuario.classList.add("fa-user");

    imagen_passwor.classList.add("fa");
    imagen_passwor.classList.add("fa-lock");

    container_usuario.classList.add("container_flex");
    container_usuario.appendChild(imagen_usuario);
    container_usuario.appendChild(usuario);

    container_password.classList.add("container_flex");
    container_password.appendChild(imagen_passwor);
    container_password.appendChild(passwor);

    contenedor.classList.add("contenedor_login");
    contenedor.appendChild(container_usuario);
    contenedor.appendChild(container_password);

    switch (flujo) {
        case "iniciar_sesion_flujo":
            ingresar.innerHTML = await obtener_nombre_application("popupGeneradoIniciar");
            contenedor.setAttribute("id", "contenedor_login_validacion");
            usuario.setAttribute("title", "Tipee su nombre de usuario registrado");
            passwor.setAttribute("title", "Tipee el password registrado");

            ingresar.onclick = () => {

                try {

                    let validacion = sessionStorage.getItem("sessionUsuario").split(",");

                    if (atob(validacion[0]) === usuario.value && atob(validacion[1]) === passwor.value) {

                        navegacion_logueado(navegador, atob(validacion[0]));
                        document.body.removeChild(contenedor);

                    } else {

                        usuario.value = "";
                        passwor.value = "";

                    }

                } catch (error) {

                    usuario.value = "";
                    passwor.value = "";
                    console.log(`Error capturado ${error}`);

                }

            };
            break;
        case "registrarse_flujo":
            ingresar.innerHTML = await obtener_nombre_application("popupGeneradoRegistrarse");
            contenedor.setAttribute("id", "contenedor_registrar_validacion");
            let contenedor_repetir = document.createElement("div");
            let password_repetir = document.createElement("input");
            let imagen_repetir = document.createElement("i");
            let contenedor_auth = document.createElement("div");
            let autorizacion = document.createElement("input");
            let imagen_auth = document.createElement("i");

            imagen_repetir.classList.add("fa");
            imagen_repetir.classList.add("fa-key");
            imagen_auth.classList.add("fa");
            imagen_auth.classList.add("fa-bullseye");

            contenedor_repetir.classList.add("container_flex");
            contenedor_repetir.appendChild(imagen_repetir);
            contenedor_repetir.appendChild(password_repetir);
            contenedor_auth.classList.add("container_flex");
            contenedor_auth.appendChild(imagen_auth);
            contenedor_auth.appendChild(autorizacion);

            usuario.setAttribute("title", "Tipee su nombre de usuario para registrarlo");
            passwor.setAttribute("title", "Tipee el password para registrarlo");

            password_repetir.setAttribute("placeholder", await obtener_nombre_application("popupGeneradoCamposPlaceHolderConfirmPassword"));
            password_repetir.setAttribute("title", "Tipee nuevamente su password para confirmar");
            password_repetir.setAttribute("type", "password");

            autorizacion.setAttribute("placeholder", await obtener_nombre_application("popupGeneradoCamposPlaceHolderAuthentica"));
            autorizacion.setAttribute("title", "Tipee codigo de administrador");
            autorizacion.setAttribute("type", "password");

            contenedor.appendChild(contenedor_repetir);
            contenedor.appendChild(contenedor_auth);

            let confirmar_autorizacion = await obtener_nombre_application("claveRegistrarUsuario");
            ingresar.onclick = () => {

                if (usuario.value.length > 5 && passwor.value.length > 5 
                                             && password_repetir.value.length > 5 && passwor.value === password_repetir.value
                                                                                  && autorizacion.value === atob(confirmar_autorizacion)) {

                    sessionStorage.setItem("sessionUsuario", [btoa(usuario.value), btoa(password_repetir.value)]);
                    document.body.removeChild(contenedor);
                    navegacion_logueado(navegador, usuario.value);

                } else {console.log("CAMPOS NO PERMITIDOS");}

            };
            break;
        default:
            console.log("FLUJO NO VALIDO");
    } 

    contenedor.appendChild(ingresar);
    document.body.appendChild(contenedor);
    
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

function cerrar_sesion(informacion, navegacion) {

    try {

        var contenedor_pokemones = document.getElementById("contenedor_informacion_pokemon");
        var filtro_pokemon = document.getElementById("contenedor_filtro_pokemon");

        if (contenedor_pokemones !== null) {
            contenedor_pokemones.remove();
        }

        if (filtro_pokemon !== null) {
            filtro_pokemon.remove();
        }
        
    } catch (error) {console.log(error);}

    navegacion.removeChild(informacion);
    navegacion_no_logueado(document.getElementById("contenedor_buscar_pokemon"));
    
}