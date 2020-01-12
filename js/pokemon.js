//console.log("EJECUTOR 1");

window.onload = () => {

    if (typeof(Storage) !== "undefined") {

        // NAVEGACION JS LINEA 1 
        // CHARCODE IMPORTANTE DEL 32 AL 127

        cargar_navegacion();
        document.body.removeChild(document.getElementById("loader"));
        
    } else {console.log("No Soporta STORAGE");}
}

function verificar_existencia() {

    var flujo = "";
    var contenedor_principal = document.getElementById("contenedor_informacion_pokemon");
    var tamama = contenedor_principal.childNodes.length;

    console.log(tamama);

    if (tamama == 0) {
        flujo = "nuevo";
    } else {
        flujo = "usado";
    }

    validar_buscar_pokemon(flujo);

}

function validar_buscar_pokemon(flujo_disparar) {

    try {

        let list_box_flujo = document.getElementById("list_box");
        let campo_ingresar_pokemon = document.getElementById("destroyer");
        let contenedor_principal = document.getElementById("contenedor_informacion_pokemon");
        let boton_filtro = document.getElementById("boton_buscar_pokemon");

        if (flujo_disparar === "usado") {
            validar_pokemon_en_pantalla(contenedor_principal);
        }

        if (list_box_flujo.value == "1") {

            campo_ingresar_pokemon.disabled = true;
            list_box_flujo.disabled = true;
            boton_filtro.disabled = true;
            boton_filtro.classList.remove("fondo_boton_aceptado");
            let numero = campo_ingresar_pokemon.value;
            if (numero > 151) {
                document.body.removeChild(document.getElementById("contenedor_filtro_pokemon"));
                return ;
            }
            buscar_pokemon(numero);
            
        } else if (list_box_flujo.value == "2") {

            campo_ingresar_pokemon.disabled = true;
            list_box_flujo.disabled = true;
            boton_filtro.disabled = true;
            boton_filtro.classList.remove("fondo_boton_aceptado");
            if (campo_ingresar_pokemon.value == "") {
                document.body.removeChild(document.getElementById("contenedor_filtro_pokemon"));
            }
            buscar_pokemon(campo_ingresar_pokemon.value);
            campo_ingresar_pokemon.value = "";
            
        }

    } catch (error) { console.log(`El error es ${error}`); }

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

function filtrar_contenido_necesario(poke_informacion){

    // VARIABLES NECESARIAS PARA CAPTURAR DURANTE LA EJECUCION
    var peso_aproximado     = poke_informacion.weight / 10;
    var total_movimientos   = poke_informacion.moves.length;
    var total_basica        = poke_informacion.stats.length;
    var total_tipo_pokemon  = poke_informacion.types.length;
    var total_habilidades   = poke_informacion.abilities.length;
    var total_apariciones   = poke_informacion.game_indices.length;
    var foto_mostrar        = poke_informacion.sprites.front_default;

    // ARREGLO PARA CADA TIPO DE ATRIBUTO QUE NECESITO
    var identityPokemon      = poke_informacion.id;
    var nombrePokemon        = `${poke_informacion.name.toUpperCase()}`;
    var arreglo_fotografia   = ["Foto Principal:", foto_mostrar];
    var arreglo_peso         = [`${peso_aproximado}Kg`];
    var arreglo_movimientos  = [];
    var arreglo_estadisticas = [];
    var arreglo_apariciones  = [];
    var arreglo_tipo         = [];
    var arreglo_habilidades  = [];
    var arreglo_general      = [identityPokemon, nombrePokemon, arreglo_fotografia, arreglo_peso, arreglo_habilidades, arreglo_tipo, arreglo_estadisticas, arreglo_apariciones, arreglo_movimientos];

    // CICLOS FOR PARA AGREGAR LA RESPECTIVA INFORMACION EN CADA ARREGLO

    // MOVIMIENTOS DISPONIBLES
    for(let contador = 0; contador < total_movimientos; contador++){
        arreglo_movimientos.push(`${poke_informacion.moves[contador].move.name.toUpperCase()}`);
    }

    for(let contador = 0; contador < total_basica; contador++){
        arreglo_estadisticas.push(`${poke_informacion.stats[contador].stat.name.toUpperCase()} : ${poke_informacion.stats[contador].base_stat} basico`);
    }

    // APARICIONES
    for(let contador = 0; contador < total_apariciones; contador++){
        arreglo_apariciones.push(`${poke_informacion.game_indices[contador].version.name.toUpperCase()}`);
    }

    // TIPO
    for(let contador = 0; contador < total_tipo_pokemon; contador++){
        arreglo_tipo.push(`${poke_informacion.types[contador].type.name.toUpperCase()}`);
    }

    // HABILIDADES
    for(let contador = 0; contador < total_habilidades; contador++){
        arreglo_habilidades.push(`${poke_informacion.abilities[contador].ability.name.toUpperCase()}`);
    }

    // ENVIAR CONTENIDO PARA SETEARLO EN PANTALLA
    crear_contenido_visual(arreglo_general);

}

function buscar_pokemon(identificador) {
    try {

        fetch(`https://pokeapi.co/api/v2/pokemon/${identificador}`)
            .then((pokemon) => {
                if (pokemon.status == 404) {
                    document.body.removeChild(document.getElementById("contenedor_filtro_pokemon"));
                    return ;
                }
                pokemon.json()
                    .then((informacion) => {
                        filtrar_contenido_necesario(informacion);
                    })
            })
            .catch((fallo) => console.log("El fallo es: " + fallo));

    } catch (error) {console.log(`ERROR DETECTADO ES ${error}`);}
}

function id_aletaroio() {

    var id = parseInt(Math.random() * (151 - 1) + 1);

    if (id > 151) {
        return parseInt(Math.random() * (151 - 1) + 1);
    }

    return id;

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