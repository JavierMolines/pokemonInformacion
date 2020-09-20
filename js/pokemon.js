var buscador_global_id = 0;
var contador_global    = 0;
var global_limite      = 0;
var global_nombre      = "";

function limpiar_globales() {
    buscador_global_id = 0;
    contador_global    = 0;
    global_limite      = 0;
    global_nombre      = "";
}

function manejador_global() {

    if(global_limite === contador_global){
        limpiar_globales();
    }

    if(global_limite > 0 && buscador_global_id !== 151){

        contador_global++;
        buscador_global_id++;
        validar_buscar_pokemon("nuevo");
        
    } else {
        buscador_pokemon_asincrono.remove();
    }
}

function buscar_pokemon(identificador) {
    try {
        console.log(identificador);
        fetch(`https://pokeapi.co/api/v2/pokemon/${identificador}`)
            .then((pokemon) => {

                if (pokemon.status == 200) {
                    pokemon.json()
                        .then((informacion) => {
                            filtrar_contenido_necesario(informacion);
                        });
                } else {// EXPLOTO ESTA MIERDA AJAAJAJJAA
                    buscador_pokemon_asincrono.remove();
                }

            })
            .catch((fallo) => buscador_pokemon_asincrono.remove());
    } catch (error) {
        buscador_pokemon_asincrono.remove();
    }
}

function verificar_existencia() {

    let contenedor_icono     = document.createElement("div");
    let icono_buscador       = document.createElement("i");
    let nombre_buscar        = document.getElementById("nombre_pokemon_campo");
    let cantidad_buscar      = document.getElementById("numero_buscar_campo");
    let contenido_pokemon    = document.getElementById("contenedor_informacion_pokemon");
    let flujo                = contenido_pokemon.childNodes.length > 0 ? "usado" : "nuevo";

    // DAR ESTILOS
    contenedor_icono.style.width = "100%";
    contenedor_icono.style.height = "100%";
    contenedor_icono.style.display = "flex";
    contenedor_icono.style.flexDirection = "column";
    contenedor_icono.style.alignItems = "center";
    contenedor_icono.style.justifyContent = "center";
    contenedor_icono.style.position = "fixed";

    // AGREGAR BETA EN PANTALLA
    icono_buscador.classList.add("fa");
    icono_buscador.classList.add("fa-cog");
    icono_buscador.setAttribute("id", "cargando_busqueda_de_pokemon");
    contenedor_icono.setAttribute("id", "buscador_pokemon_asincrono");
    contenedor_icono.appendChild(icono_buscador);
    document.body.appendChild(contenedor_icono);

    //REINICIAR BUSCADOR
    limpiar_globales();
    global_nombre = nombre_buscar.value.toLowerCase();

    if(cantidad_buscar.value !== ""){
        global_limite = parseInt(cantidad_buscar.value);
    }

    eliminar_popup_buscador();
    validar_buscar_pokemon(flujo);

}

function validar_buscar_pokemon(flujo_disparar) {

    let cadena_enviar = ""; 

    if(buscador_global_id === 0){
        cadena_enviar = global_nombre;
    } else {
        cadena_enviar = buscador_global_id;
    }

    if(flujo_disparar === "usado"){
        validar_pokemon_en_pantalla(document.getElementById("contenedor_informacion_pokemon")); 
    }

    buscar_pokemon(cadena_enviar);

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
    buscador_global_id       = poke_informacion.id;
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
        arreglo_estadisticas.push(`${poke_informacion.stats[contador].stat.name.toUpperCase()}:${poke_informacion.stats[contador].base_stat}`);
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