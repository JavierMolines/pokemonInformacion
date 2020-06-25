function buscar_pokemon(identificador) {
    try {

        if (identificador === "") {

            eliminar_popup_buscador();

        } else {

            fetch(`https://pokeapi.co/api/v2/pokemon/${identificador}`)
                .then((pokemon) => {
                    if (pokemon.status == 200) {
                        pokemon.json()
                            .then((informacion) => {
                                filtrar_contenido_necesario(informacion);
                            });
                    } else {// EXPLOTO ESTA MIERDA AJAAJAJJAA
                        eliminar_popup_buscador();
                        return;
                    }

                })
                .catch((fallo) => console.log("El fallo es: " + fallo));

        }

    } catch (error) { console.log(`ERROR DETECTADO ES ${error}`); }
}

function validar_buscar_pokemon(flujo_disparar) {

    try {

        let list_box_flujo = document.getElementById("list_box");
        let pokemon_seleccionado_lista = document.getElementById("destroyer");
        let contenedor_principal = document.getElementById("contenedor_informacion_pokemon");
        let boton_filtro = document.getElementById("boton_buscar_pokemon");

        if (flujo_disparar === "usado") {

            validar_pokemon_en_pantalla(contenedor_principal);

        }

        if (list_box_flujo.value == "1") {// TEXTO

            pokemon_seleccionado_lista.disabled = true;
            list_box_flujo.disabled = true;
            boton_filtro.disabled = true;
            boton_filtro.classList.remove("fondo_boton_aceptado");

            if (pokemon_seleccionado_lista.value == "") {

                eliminar_popup_buscador();

            } else {

                buscar_pokemon(pokemon_seleccionado_lista.value.toLowerCase());
                pokemon_seleccionado_lista.value = "";

            }

        } else {// NUMEROS

            if (list_box_flujo.value == "2" && contenedor_informacion_pokemon.childNodes.length == 3) {

                eliminar_popup_buscador();
                
            } else {

                pokemon_seleccionado_lista.disabled = true;
                list_box_flujo.disabled = true;
                boton_filtro.disabled = true;
                boton_filtro.classList.remove("fondo_boton_aceptado");
                let numero = pokemon_seleccionado_lista.value;

                if (numero > 151) {

                    eliminar_popup_buscador();
                    
                } else {

                    buscar_pokemon(numero);

                }
            }
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

/*
    Respaldada porsia :D
    PROPIEDAD PARA FOTO DE LA MISMA API: poke_informacion.sprites.front_default
*/
function filtrar_contenido_necesario(poke_informacion){

    let nuevo_campo = "";

    if(poke_informacion.id < 10){
        nuevo_campo = `00${poke_informacion.id}`;
    } else if(poke_informacion.id <= 99){
        nuevo_campo = `0${poke_informacion.id}`;
    } else {
        nuevo_campo = `${poke_informacion.id}`;
    }

    // VARIABLES NECESARIAS PARA CAPTURAR DURANTE LA EJECUCION
    let peso_aproximado     = poke_informacion.weight / 10;
    let total_movimientos   = poke_informacion.moves.length;
    let total_basica        = poke_informacion.stats.length;
    let total_tipo_pokemon  = poke_informacion.types.length;
    let total_habilidades   = poke_informacion.abilities.length;
    let total_apariciones   = poke_informacion.game_indices.length;
    let foto_mostrar        = `https://assets.pokemon.com/assets/cms2/img/pokedex/site_search/${nuevo_campo}.png`;

    // ARREGLO PARA CADA TIPO DE ATRIBUTO QUE NECESITO
    let identityPokemon      = poke_informacion.id;
    let nombrePokemon        = `${poke_informacion.name.toUpperCase()}`;
    let arreglo_fotografia   = ["Foto Principal:", foto_mostrar];
    let arreglo_peso         = [`${peso_aproximado}Kg`];
    let arreglo_movimientos  = [];
    let arreglo_estadisticas = [];
    let arreglo_apariciones  = [];
    let arreglo_tipo         = [];
    let arreglo_habilidades  = [];
    let arreglo_general      = [identityPokemon, nombrePokemon, arreglo_fotografia, arreglo_peso, arreglo_habilidades, arreglo_tipo, arreglo_estadisticas, arreglo_apariciones, arreglo_movimientos];

    // CICLOS FOR PARA AGREGAR LA RESPECTIVA INFORMACION EN CADA ARREGLO

    for (let contador = 0; contador < total_movimientos; contador++) {
        // MOVIMIENTOS DISPONIBLES
        arreglo_movimientos.push(`${poke_informacion.moves[contador].move.name.toUpperCase()}`);
    }

    for (let contador = 0; contador < total_basica; contador++) {
        // STATS
        arreglo_estadisticas.push(`${poke_informacion.stats[contador].stat.name.toUpperCase()} : ${poke_informacion.stats[contador].base_stat} basico`);
    }

    for (let contador = 0; contador < total_apariciones; contador++) {
        // APARICIONES
        arreglo_apariciones.push(`${poke_informacion.game_indices[contador].version.name.toUpperCase()}`);
    }

    for (let contador = 0; contador < total_tipo_pokemon; contador++) {
        // TIPO
        arreglo_tipo.push(`${poke_informacion.types[contador].type.name.toUpperCase()}`);
    }

    for (let contador = 0; contador < total_habilidades; contador++) {
        // HABILIDADES
        arreglo_habilidades.push(`${poke_informacion.abilities[contador].ability.name.toUpperCase()}`);
    }

    // ENVIAR CONTENIDO PARA SETEARLO EN PANTALLA
    crear_contenido_visual(arreglo_general);

}