async function crear_popup(flujo) {

    if (validar_continuacion_crear_popup(flujo) !== true) {

        let mensaje_titulo      = "";
        let id_contenedor       = "";
        let boton_titulo        = "";
        let titulo              = document.createElement("h1");
        let contenedor_toast    = document.createElement("div");
        let contenedor          = document.createElement("div");
        let ingresar            = document.createElement("button");
        let invocacion          = () => console.log("HOLA");
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

        contenedor.appendChild(titulo);
        contenedor.appendChild(contenedor_toast);

        // CREAR CAMPOS PARA EL LOGIN
        for (let contador = 0; contador < objetoCreacionPopup.campos.length; contador++) {

            let interno = objetoCreacionPopup.campos[contador];
            let contenedor_interno = document.createElement("div");
            let contenedor_icono = document.createElement("div");
            let campo = document.createElement("input");
            let icono = document.createElement("i");

            campo.setAttribute("placeholder", interno);
            campo.setAttribute("type", objetoCreacionPopup.tipoCampos[contador]);
            campo.setAttribute("maxlength", 20);
            campo.setAttribute("autocomplete", "off");

            icono.classList.add("fa");
            icono.classList.add(objetoCreacionPopup.iconos[contador]);
            campo.classList.add("campo_editable_cliente");

            campo.addEventListener("keydown", habilitar_boton);
            campo.addEventListener("keypress", habilitar_boton);
            campo.addEventListener("keyup", habilitar_boton);

            contenedor_icono.setAttribute("id", "contenedor_icono_login");
            contenedor_icono.append(icono);

            contenedor_interno.classList.add("container_flex");
            contenedor_interno.appendChild(contenedor_icono);
            contenedor_interno.appendChild(campo);
            contenedor.appendChild(contenedor_interno);

            if (contador == 1 && flujo === "iniciar_sesion_flujo") {
                break;
            }

        }

        // EDITAR FLUJO SEGUN CONSULTA
        if (flujo === "iniciar_sesion_flujo") {

            mensaje_titulo = "Ingresar";
            id_contenedor  = "contenedor_login_validacion";
            boton_titulo   = await obtener_nombre_application("popupGeneradoIniciar");
            invocacion     = obtener_usuario_registrado;

        } else if (flujo === "registrarse_flujo") {

            mensaje_titulo = "Registro de Usuario";
            id_contenedor  = "contenedor_registrar_validacion";
            boton_titulo   = await obtener_nombre_application("popupGeneradoRegistrarse");
            invocacion     = registrar_usuario;
        }

        // AGREGAR PROPIEDADES FINALES
        titulo.innerHTML = mensaje_titulo;
        ingresar.disabled = true;
        ingresar.classList.add("btn_apagado_login");
        ingresar.innerHTML = boton_titulo;
        ingresar.onclick = invocacion;
        contenedor.setAttribute("id", id_contenedor);
        contenedor_toast.setAttribute("id", "mensaje_toast_usuario");
        contenedor.classList.add("contenedor_login");
        contenedor.appendChild(ingresar);
        document.body.appendChild(contenedor);

    }

}

async function registrar_usuario() {

    let caracteresMinimos = 5;
    let mensajes_objeto   = mensaje_validacion_crear_usuario();
    let mensajeUsuario    = "";
    let contenedor        = document.getElementById("contenedor_registrar_validacion");
    let navegador         = document.getElementById("contenedor_buscar_pokemon");
    let flx_toast         = document.getElementById("mensaje_toast_usuario");
    let campos  = seleccionar_campos_credenciales();
    let usuario = campos[0];
    let passwor = campos[1];
    let _repeat = campos[2];
    let _access = campos[3];

    // VALIDACIONES CREAR USUARIO
    if (usuario.value.length > caracteresMinimos) {
        if (passwor.value.length > caracteresMinimos) {
            if (passwor.value === _repeat.value) {
                if (_access.value === atob(await obtener_nombre_application("claveRegistrarUsuario"))) {
                    agregar_usuario_registrado(usuario, _repeat);
                    contenedor.remove();
                    navegacion_logueado(navegador, usuario.value);
                } else {
                    mensajeUsuario = mensajes_objeto.admi;
                }
            } else {
                mensajeUsuario = mensajes_objeto.coin;
            }
        } else {
            mensajeUsuario = mensajes_objeto.suj1 + mensajes_objeto.pass + mensajes_objeto.suj2 + caracteresMinimos + mensajes_objeto.suj3;
        }
    } else {
        mensajeUsuario = mensajes_objeto.suj1 + mensajes_objeto.user + mensajes_objeto.suj2 + caracteresMinimos + mensajes_objeto.suj3;
    }

    // MENSAJE ERROR TOAST
    if(mensajeUsuario !== ""){

        flx_toast.appendChild(generar_mensaje_toast(mensajeUsuario));

    }
    
}

async function agregar_usuario_registrado(usuario, password_repetir) {

    let tituloPersona = await obtener_nombre_application("indicadorRegistroPersona");
    localStorage.setItem(tituloPersona, [btoa(usuario.value), btoa(password_repetir.value)]);

}

async function obtener_usuario_registrado() {

    let mostrar   = true;
    let campos    = seleccionar_campos_credenciales();
    let usuario   = campos[0];
    let passwor   = campos[1];

    if (localStorage.length > 0) {
        let validacion = await obtener_usuario();
        if (atob(validacion[0]) === usuario.value && atob(validacion[1]) === passwor.value) {
            mostrar = false;
            cambiar_vista();
        }
    }

    // MENSAJE ERROR TOAST
    if (mostrar === true) {

        usuario.value = "";
        passwor.value = "";
        document.getElementById("mensaje_toast_usuario").appendChild(generar_mensaje_toast("CREDENCIALES INVALIDAS"));
        habilitar_boton();

    }

}

async function obtener_usuario() {

    let tituloPersona = await obtener_nombre_application("indicadorRegistroPersona");
    let validacion = localStorage.getItem(tituloPersona).split(",");
    return validacion;

}

function auto_login() {

    if(localStorage.length > 0){
        cambiar_vista();
    }

}

async function cambiar_vista() {

    let contenedor_login = document.getElementById("contenedor_login_validacion");
    if(contenedor_login !== null){
        contenedor_login.remove();
    }

    let navegador = document.getElementById("contenedor_buscar_pokemon");
    let validacion = await obtener_usuario();
    navegacion_logueado(navegador, atob(validacion[0]));

}

function seleccionar_campos_credenciales() {

    let campos_credenciales = document.querySelectorAll(`.campo_editable_cliente`);
    return campos_credenciales;

}

function generar_mensaje_toast(mensaje) {

    let _principal    = document.createElement("div"); 
    let _conte_icono  = document.createElement("div"); 
    let _conte_mensa  = document.createElement("div"); 
    let _enviar_icono = document.createElement("i"); 
    let _enviar_msg   = document.createElement("p"); 
    _enviar_icono.classList.add("fa");
    //_enviar_icono.classList.add("fa-times-circle");
    _enviar_icono.classList.add("fa-times");
    _enviar_msg.innerHTML = mensaje;
    _conte_icono.appendChild(_enviar_icono);
    _conte_mensa.appendChild(_enviar_msg);
    _principal.appendChild(_conte_icono);
    _principal.appendChild(_conte_mensa);
    _principal.classList.add("contenedor_toast_error");
    borrar_toast(_principal);

    return _principal;
    
}

function limpiar_campos() {

    for (let campos of seleccionar_campos_credenciales()) {

        campos.value = "";
        
    }
    
}

function mensaje_validacion_crear_usuario() {

    let mensaje = {

        admi: "CLAVE ADMIN ERRADA",
        coin: "LA CLAVE NO COINCIDE",
        pass: " CLAVE ",
        user: " USUARIO ",
        suj1: "EL CAMPO",
        suj2: "TIENE MENOS DE ",
        suj3: " CARACTERES"

    };
    
    return mensaje;
}

function borrar_toast(identificador) {

    let tiempo_remover = setTimeout(()=>{

        identificador.style.opacity = 0;

        let quitar_toast = setTimeout(()=>{

            identificador.remove();
            clearTimeout(quitar_toast);
            
        }, 500);

        clearTimeout(tiempo_remover);
    }, 2000);
    
}

function habilitar_boton() {

    let cuenta  = 0;
    let boton   = document.querySelector(".contenedor_login button");
    let campos  = document.querySelectorAll(".contenedor_login input");

    for (let btn_individual of campos) {
        let texto = btn_individual.value;
        if(texto !== "" && texto !== null && texto !== undefined){
            cuenta++;
        }
    }

    let cls_add = cuenta === campos.length ? "btn_encendido_login" : "btn_apagado_login";
    let cls_del = cuenta === campos.length ? "btn_apagado_login" : "btn_encendido_login";
    let estado  = cuenta === campos.length ? false : true;
    
    boton.classList.replace(cls_del, cls_add);
    boton.disabled = estado;

}