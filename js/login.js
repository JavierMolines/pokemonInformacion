async function crear_popup(flujo, navegador) {

    var pasaonopasa = validar_continuacion_crear_popup(flujo);

    if (pasaonopasa !== true) {

        var contenedor = document.createElement("div");
        var usuario = document.createElement("input");
        var passwor = document.createElement("input");
        var ingresar = document.createElement("button");
        var container_usuario = document.createElement("div");
        var container_password = document.createElement("div");
        var imagen_usuario = document.createElement("i");
        var imagen_passwor = document.createElement("i");

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

                    } else { console.log("CAMPOS NO PERMITIDOS"); }

                };
                break;
            default:
                console.log("FLUJO NO VALIDO");
        }

        contenedor.appendChild(ingresar);
        document.body.appendChild(contenedor);

    }

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
        
    } catch (error) {console.log(error);}

    navegacion.removeChild(informacion);
    navegacion_no_logueado(document.getElementById("contenedor_buscar_pokemon"));
    
}