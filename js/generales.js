function eliminar_popup_buscador() {

    try {

        let contenedor_buscador = document.getElementById("contenedor_filtro_pokemon");
        contenedor_buscador.style.opacity = 0;
        let quitar_buscador = setTimeout(()=>{
            contenedor_buscador.remove();
            clearTimeout(quitar_buscador);
        }, 500);
    
    } catch (error) {}
    
}

function validar_pokemon_en_pantalla(contenedor_con_los_pokemons) {

    try {

        var eliminaciones = [];

        for (let contadorsito = 0; contadorsito < contenedor_con_los_pokemons.childNodes.length; contadorsito++) {
            if (contenedor_con_los_pokemons.childNodes[contadorsito].id !== undefined) {
                eliminaciones.push(contenedor_con_los_pokemons.childNodes[contadorsito].id);
            }
        }

        if (eliminaciones.length > 0) {

            for (let contadorsito = 0; contadorsito < eliminaciones.length; contadorsito++) {
                let performance = document.getElementById(eliminaciones[contadorsito]);
                contenedor_con_los_pokemons.removeChild(performance);
            }

        }

    } catch (error) { console.log(error); }
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

function validar_expresion_regular_solo_numeros(entrada) {

    if (entrada.length == 0) {
        return "vacio";
    }

    let resultado = entrada.match(/[0-9]/g);

    if (resultado === null) {
        return "vacio";
    }

    let nuevoString = resultado.join();
    let finalResultado = nuevoString.replace(/,/g, "");

    return finalResultado;

}

function validar_expresion_regular_solo_texto(entrada) {

    if (entrada.length == 0) {
        return 0;
    }

    let resultado = entrada.match(/[a-z]/g);

    if (resultado == null) {
        return 0;
    }

    let nuevoString = resultado.join();
    let finalResultado = nuevoString.replace(/,/g, "");

    return finalResultado;
    
}

function id_aletaroio() {

    var id = parseInt(Math.random() * (151 - 1) + 1);

    if (id > 151) {
        return parseInt(Math.random() * (151 - 1) + 1);
    }

    return id;

}

function eliminar_opciones_listbox(listado) {

    while (listado.childNodes.length != 0) {
        listado.remove(0);
    }

}
