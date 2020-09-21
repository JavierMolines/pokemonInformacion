async function crear_filtro_pokemon() {
 
    let buscador_pokemon = document.createElement("div");
    buscador_pokemon.setAttribute("id", "contenedor_filtro_pokemon");

    crear_titulo_buscador(buscador_pokemon);
    crear_txt_buscador(buscador_pokemon);
    crear_boton_buscador(buscador_pokemon);

    document.body.appendChild(buscador_pokemon);

}

function crear_titulo_buscador(buscador_pokemon) {

    let titulo_filtro             = document.createElement("h3");
    titulo_filtro.style.textAlign = "center";
    titulo_filtro.innerHTML       = "Buscador de Pokemon";
    buscador_pokemon.appendChild(titulo_filtro);

}

function crear_txt_buscador(buscador_pokemon) {

    let contenedor_busqueda = document.createElement("div");
    let flex_buscador = document.createElement("div");

    contenedor_busqueda.setAttribute("id", "contenedor_campos_input");
    flex_buscador.setAttribute("id", "mostrar_coincidencias");
    
    let campo_buscar = document.createElement("input");
    campo_buscar.setAttribute("id", "nombre_pokemon_campo");
    campo_buscar.setAttribute("type", "text");
    campo_buscar.setAttribute("autocomplete", "off");
    campo_buscar.setAttribute("maxlength", 11);
    campo_buscar.setAttribute("placeholder", "Nombre del pokemon");
    campo_buscar.addEventListener("keypress", buscar_coincidencias);
    campo_buscar.addEventListener("keyup", buscar_coincidencias);

    let limite_numero = document.createElement("input");
    limite_numero.style.width = "20%";
    limite_numero.style.textAlign = "center";
    limite_numero.setAttribute("id", "numero_buscar_campo");
    limite_numero.setAttribute("type", "number");
    limite_numero.setAttribute("autocomplete", "off");
    limite_numero.setAttribute("min", 1);
    limite_numero.setAttribute("max", 151);
    limite_numero.addEventListener("keypress", validar_numero_ingresado);
    limite_numero.addEventListener("keyup", validar_numero_ingresado);
    limite_numero.setAttribute("placeholder", "Limite");

    contenedor_busqueda.appendChild(campo_buscar);
    contenedor_busqueda.appendChild(limite_numero);
    buscador_pokemon.appendChild(contenedor_busqueda);
    buscador_pokemon.appendChild(flex_buscador);
    
}

function crear_boton_buscador(buscador_pokemon) {

    let boton_filtro       = document.createElement("button");
    boton_filtro.innerHTML = "Buscar  ";
    boton_filtro.disabled  = true;
    boton_filtro.setAttribute("id", "boton_buscar_pokemon");
    boton_filtro.addEventListener("click", verificar_existencia);
    buscador_pokemon.appendChild(boton_filtro);
    
}

function validar_numero_ingresado() {

    let retornar = "";
    let filtro   = /\d/ig;
    let campo    = document.getElementById("numero_buscar_campo");
    let recibido = campo.value;

    if(filtro.test(recibido) === true){
        let numeros = recibido.match(filtro).join("");
        let vl_numero = parseInt(numeros);
        if(vl_numero > 0 && vl_numero < 152){
            retornar = numeros;
        }
    }

    campo.value = retornar;
    
}

async function buscar_coincidencias() {

    let listado_pokemon  = await obtener_nombre_application("nombre_pokemons");
    let campo_mostrar    = document.getElementById("mostrar_coincidencias");
    let campo            = document.getElementById("nombre_pokemon_campo");
    let nombre_ingresado = campo.value.trim();

    campo.value = nombre_ingresado.slice(0, 1).toUpperCase() + nombre_ingresado.slice(1);
    campo_mostrar.innerHTML = "";

    if (nombre_ingresado !== "" && nombre_ingresado !== null) {

        apagar_boton();

        for (let nombre_coincidencia of listado_pokemon) {

            let reg_nombres = `^${nombre_ingresado}`;
            let reg_exp_filtro = new RegExp(reg_nombres, "ig");
            // SI EL TEXTO COINCIDE CON ALGUN NOMBRE IR MOSTRANDO OPCIONES
            if(reg_exp_filtro.test(nombre_coincidencia) === true){

                let mostrar_pokemon = document.createElement("p");
                mostrar_pokemon.innerHTML = nombre_coincidencia;
                mostrar_pokemon.addEventListener("click", () => {
                    campo_mostrar.innerHTML = "";
                    campo.value = nombre_coincidencia;
                    encender_boton();
                });
                campo_mostrar.appendChild(mostrar_pokemon);

            }

            reg_nombres += "$";
            reg_exp_filtro = new RegExp(reg_nombres, "ig");
            // CUANDO SE ESCRIBA EL NOMBRE CORRECTO DEL POKEMON LIMPIAR Y ACTIVAR EL BOTON
            if (reg_exp_filtro.test(nombre_coincidencia) === true) {
                encender_boton();
                campo_mostrar.innerHTML = "";
                break;
            }
        }
    } else {

        apagar_boton();
    }
}

function obtener_boton() {

    return document.getElementById("boton_buscar_pokemon");
    
}

function apagar_boton() {

    let boton_filtro = obtener_boton();
    boton_filtro.disabled = true;
    boton_filtro.classList.remove("fondo_boton_aceptado");

}

function encender_boton() {

    let boton_filtro = obtener_boton();
    boton_filtro.disabled = false;
    boton_filtro.classList.add("fondo_boton_aceptado");

}