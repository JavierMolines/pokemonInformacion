function acordeon_especificaciones(pokemon_identificador, contenedor_enviar_elementos, nombres_extraidos) {

    for (let contador = 0; contador < nombres_extraidos.length; contador++) {

        if (contador == 0 || contador == 1) {

            let etiqueta_mostrar = document.createElement("h2");
            etiqueta_mostrar.innerHTML = `${nombres_extraidos[contador]} : ${pokemon_identificador[contador]}`;
            if (contador == 1) {
                etiqueta_mostrar.innerHTML = `${nombres_extraidos[contador]} : ${pokemon_identificador[3]}`;
            }
            contenedor_enviar_elementos.appendChild(etiqueta_mostrar);
            
        } else {

            let contenedor_identificacion_tecnica = document.createElement("button");
            let contenedor_info = document.createElement("div");

            switch (contador) {
                case 2:
                    for (let interno_contador = 0; interno_contador < pokemon_identificador[4].length; interno_contador++) {
                        let etiqueta_info = document.createElement("p");
                        etiqueta_info.innerHTML = pokemon_identificador[4][interno_contador];
                        contenedor_info.appendChild(etiqueta_info);
                    }
                    break;
                case 3:
                    for (let interno_contador = 0; interno_contador < pokemon_identificador[5].length; interno_contador++) {
                        let etiqueta_info = document.createElement("p");
                        etiqueta_info.innerHTML = pokemon_identificador[5][interno_contador];
                        contenedor_info.appendChild(etiqueta_info);
                    }
                    break;
                case 4:
                    for (let interno_contador = 0; interno_contador < pokemon_identificador[6].length; interno_contador++) {
                        let etiqueta_info = document.createElement("p");
                        etiqueta_info.innerHTML = pokemon_identificador[6][interno_contador];
                        contenedor_info.appendChild(etiqueta_info);
                    }
                    break;
                case 5:
                    for (let interno_contador = 0; interno_contador < pokemon_identificador[7].length; interno_contador++) {
                        let etiqueta_info = document.createElement("p");
                        etiqueta_info.innerHTML = pokemon_identificador[7][interno_contador];
                        contenedor_info.appendChild(etiqueta_info);
                    }
                    break;
                case 6:
                    for (let interno_contador = 0; interno_contador < pokemon_identificador[8].length; interno_contador++) {
                        let etiqueta_info = document.createElement("p");
                        etiqueta_info.innerHTML = pokemon_identificador[8][interno_contador];
                        contenedor_info.appendChild(etiqueta_info);
                    }
                    break;
                default:
                    break;
            }

            contenedor_identificacion_tecnica.innerHTML = nombres_extraidos[contador];
            contenedor_identificacion_tecnica.onclick = () => {
                let visibilidad = contenedor_identificacion_tecnica.nextSibling;
                if (visibilidad.style.maxHeight){
                    visibilidad.style.maxHeight = null;
                } else {
                    visibilidad.style.maxHeight = visibilidad.scrollHeight + "px";
                } 
            };
            contenedor_enviar_elementos.appendChild(contenedor_identificacion_tecnica);
            contenedor_enviar_elementos.appendChild(contenedor_info);

        }

    }

}