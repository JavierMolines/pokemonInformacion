/*

    --- SHOW LOADING

*/
let fondo_espaciado = document.createElement("div");
let cargador = document.createElement("img");
fondo_espaciado.setAttribute("id", "pre_cargador");
cargador.classList.add("showloading");
cargador.setAttribute("id", "cargador_improvisado");
cargador.setAttribute("src", "../recursos/imagenes/showloading.png");
cargador.setAttribute("alt", "ImagenLogin");
fondo_espaciado.appendChild(cargador);
document.body.insertBefore(fondo_espaciado, document.body.firstChild);

/*

    --- ONLOAD WEBSITE

*/
window.onload = () => {

    // NAVEGACION JS LINEA 1 
    // CHARCODE IMPORTANTE DEL 32 AL 127
    if (typeof (Storage) !== "undefined") {

        let verificar_url_invocacion = document.baseURI.split(":");
        if (verificar_url_invocacion[0] != "file") {

            let contedor_loading = document.getElementById("pre_cargador");
            contedor_loading.style.display = "hidden";
            contedor_loading.style.opacity = 0;
            cargar_navegacion();

            setTimeout(() =>{
                document.body.removeChild(contedor_loading);
            }, 1000);

        } else {// FALLO INVOCACION ARCHIVO

            crear_mensaje_error_absoluto("LO SENTIMOS. LOS ARCHIVOS NECESITAN SER CARGADOR POR PROTOCOLOS HTTP O HTTPS");

        }


    } else {// FALLO STORAGE

        crear_mensaje_error_absoluto("LO SENTIMOS. NO SOPORTA STORAGE, USE OTRO DISPOSITIVO PARA CONECTARSE");

    }
}

function crear_mensaje_error_absoluto(mensaje_pantalla) {

    let fondo_loading = document.getElementById("pre_cargador");
    let contenedor_error = document.createElement("div");
    fondo_loading.removeChild(document.getElementById("cargador_improvisado"));
    contenedor_error.classList.add("contenedor_fallo_storage");
    contenedor_error.innerHTML = mensaje_pantalla;
    fondo_loading.appendChild(contenedor_error);
    
}