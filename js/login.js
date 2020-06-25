async function crear_popup(flujo) {

    let objetoCreacionPopup = {
        tipoCampos: ["text", "password", "password", "password"],
        iconos: ["fa-user", "fa-lock", "fa-key", "fa-bullseye"],
        campos: [
            await obtener_nombre_application("popupGeneradoCamposPlaceHolderUsuario"),
            await obtener_nombre_application("popupGeneradoCamposPlaceHolderPassword"),
            await obtener_nombre_application("popupGeneradoCamposPlaceHolderConfirmPassword"),
            await obtener_nombre_application("popupGeneradoCamposPlaceHolderAuthentica")
        ]
    };

    if (validar_continuacion_crear_popup(flujo) !== true) {

        let contenedor = document.createElement("div");
        let ingresar = document.createElement("button");
        let identificador_contenedor = "";
        let boton_titulo = "";
        let invocacion = () => console.log("HOLA");

        // CREAR CAMPOS PARA EL LOGIN
        for (let contador = 0; contador < objetoCreacionPopup.campos.length; contador++) {

            let interno = objetoCreacionPopup.campos[contador];
            let contenedor_interno = document.createElement("div");
            let campo = document.createElement("input");
            let icono = document.createElement("i");

            campo.setAttribute("placeholder", interno);
            campo.setAttribute("type", objetoCreacionPopup.tipoCampos[contador]);

            icono.classList.add("fa");
            icono.classList.add(objetoCreacionPopup.iconos[contador]);
            campo.classList.add("campo_editable_cliente");

            contenedor_interno.classList.add("container_flex");
            contenedor_interno.appendChild(icono);
            contenedor_interno.appendChild(campo);
            contenedor.appendChild(contenedor_interno);

            if (contador == 1 && flujo === "iniciar_sesion_flujo") {
                break;
            }

        }

        // EDITAR FLUJO SEGUN CONSULTA
        if (flujo === "iniciar_sesion_flujo") {

            identificador_contenedor = "contenedor_login_validacion";
            boton_titulo = await obtener_nombre_application("popupGeneradoIniciar");
            invocacion = () => {
                obtener_usuario_registrado();
            }

        } else if (flujo === "registrarse_flujo") {

            identificador_contenedor = "contenedor_registrar_validacion";
            boton_titulo = await obtener_nombre_application("popupGeneradoRegistrarse");
            invocacion = () => {
                registrar_usuario();
            }
        }

        // AGREGAR PROPIEDADES FINALES
        ingresar.innerHTML = boton_titulo;
        ingresar.onclick = invocacion;
        contenedor.setAttribute("id", identificador_contenedor);
        contenedor.classList.add("contenedor_login");
        contenedor.appendChild(ingresar);
        document.body.appendChild(contenedor);

    }

}

async function registrar_usuario() {

    let campos = seleccionar_campos_credenciales();
    let caracteresMinimos = 5;
    let mensajeUsuario = "";
    let contenedor = document.getElementById("contenedor_registrar_validacion");
    let navegador = document.getElementById("contenedor_buscar_pokemon");
    let admin_auth = await obtener_nombre_application("claveRegistrarUsuario");
    let usuario = campos[0];
    let passwor = campos[1];
    let _repeat = campos[2];
    let _access = campos[3];

    if (usuario.value.length > caracteresMinimos) {
        if (passwor.value.length > caracteresMinimos) {
            if (passwor.value === _repeat.value) {
                if (_access.value === atob(admin_auth)) {
                    agregar_usuario_registrado(usuario, _repeat);
                    contenedor.remove();
                    navegacion_logueado(navegador, usuario.value);
                    mensajeUsuario = "REGISTRO EXITOSO";
                } else {
                    mensajeUsuario = "CLAVE ADMIN ERRADA";
                }
            } else {
                mensajeUsuario = "LA CLAVE NO COINCIDE";
            }
        } else {
            mensajeUsuario = `El campo clave tiene menos de ${caracteresMinimos}`;
        }
    } else {
        mensajeUsuario = `El campo usuario tiene menos de ${caracteresMinimos}`;
    }

    console.log(mensajeUsuario);
}

async function agregar_usuario_registrado(usuario, password_repetir) {

    let tituloPersona = await obtener_nombre_application("indicadorRegistroPersona");
    localStorage.setItem(tituloPersona, [btoa(usuario.value), btoa(password_repetir.value)]);

}

async function obtener_usuario_registrado() {

    let campos = seleccionar_campos_credenciales();
    let usuario = campos[0];
    let passwor = campos[1];

    if (localStorage.length > 0) {

        let tituloPersona = await obtener_nombre_application("indicadorRegistroPersona");
        let navegador = document.getElementById("contenedor_buscar_pokemon");
        let contenedor = document.getElementById("contenedor_login_validacion");
        let validacion = localStorage.getItem(tituloPersona).split(",");
        if (atob(validacion[0]) === usuario.value && atob(validacion[1]) === passwor.value) {
            navegacion_logueado(navegador, atob(validacion[0]));
            contenedor.remove();
        }
    }

    usuario.value = "";
    passwor.value = "";

}

function seleccionar_campos_credenciales() {
    
    let campos_credenciales = document.querySelectorAll(`.campo_editable_cliente`);
    return campos_credenciales;

}

function cerrar_sesion(informacion, navegacion) {

    try {

        var contenedor_pokemones = document.getElementById("contenedor_informacion_pokemon");
        var filtro_pokemon = document.getElementById("contenedor_filtro_pokemon");

        if (contenedor_pokemones !== null) {
            contenedor_pokemones.remove();
        }

        if (filtro_pokemon !== null) {
            eliminar_popup_buscador();
        }

    } catch (error) { console.log(error); }

    navegacion.removeChild(informacion);
    navegacion_no_logueado(document.getElementById("contenedor_buscar_pokemon"));

}