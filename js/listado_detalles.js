async function generar_listas_detalles(pokemon_identificador, contenedor_detalles) {

    let prope = [ pokemon_identificador[4], pokemon_identificador[5] ];

    for (let contador = 0; contador < prope.length; contador++) {

        let contenedor = document.createElement("div");
        let conte_botones = document.createElement("div");
        let title = document.createElement("h1");
        let tit_present = "";

        if(contador === 0){
            tit_present = "Habilidades";
        } else {
            tit_present = "Tipo";
        }

        title.innerHTML = tit_present;
        title.style.textAlign = "center";
        contenedor.appendChild(title);

        for (let interno = 0; interno < prope[contador].length; interno++) {

            let conte_details = document.createElement("button");
            let informacion = prope[contador][interno];
            conte_details.innerHTML = informacion;
            conte_botones.appendChild(conte_details);

            if(contador == 1){

                let colores_para_tipo = await filtrar_colores_tipo(informacion);
                conte_details.style.backgroundColor = colores_para_tipo;
                conte_details.style.color = "white";

            }

        }

        contenedor.classList.add("contenedor_elemento_detalles_pokemon");
        contenedor.appendChild(conte_botones);
        contenedor_detalles.appendChild(contenedor);

    }

}

async function filtrar_colores_tipo(tipo_recibido) {

    let propiedades_nativas = await obtener_nombre_application("opcionesTipoPokemon");
    let colores_enviar = "";
    
    for (let contador = 0; contador < propiedades_nativas.length; contador++) {

        let tipo_nativo = propiedades_nativas[contador][0].toLowerCase();
        let color_nativo = propiedades_nativas[contador][1];

        if(tipo_nativo === tipo_recibido.toLowerCase()){
            colores_enviar = color_nativo;
        }
        
    }

    return colores_enviar;
    
}