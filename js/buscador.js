async function crear_filtro_pokemon() {

    let opciones_rango = await obtener_nombre_application("opcionesBuscadorRango");
    let nombres_pokemon = await obtener_nombre_application("nombre_pokemons");
    let buscador_pokemon = document.createElement("div");
    let titulo_filtro = document.createElement("h3");
    let listbox_pokemon_selector = document.createElement("select");
    let listBoxSelector = document.createElement("select");
    let boton_filtro = document.createElement("button");

    buscador_pokemon.setAttribute("id", "contenedor_filtro_pokemon");
    buscador_pokemon.appendChild(titulo_filtro);
    titulo_filtro.style.textAlign = "center";
    titulo_filtro.innerHTML = "Buscador Pokemon";

    listbox_pokemon_selector.disabled = true;
    listbox_pokemon_selector.setAttribute("id", "destroyer");
    listbox_pokemon_selector.classList.add("select_filtro_pokemon");
    listbox_pokemon_selector.addEventListener("change", () => {

        if (listbox_pokemon_selector.value == "vacio") {

            boton_filtro.disabled = true;
            boton_filtro.classList.remove("fondo_boton_aceptado");

        } else {

            boton_filtro.disabled = false;
            boton_filtro.classList.add("fondo_boton_aceptado");

        }

    });
    listBoxSelector.setAttribute("id", `list_box`);
    listBoxSelector.classList.add("select_filtro_pokemon");
    listBoxSelector.addEventListener("change", () => {

        listbox_pokemon_selector.value = "";
        if (listBoxSelector.value != "0") {

            eliminar_opciones_listbox(listbox_pokemon_selector);
            listbox_pokemon_selector.disabled = false;

            for (let contadorsito = 0; contadorsito < nombres_pokemon.length; contadorsito++) {

                let opciones_pokemon = document.createElement("option");

                if (listBoxSelector.value === "1") {

                    opciones_pokemon.innerHTML = nombres_pokemon[contadorsito];
                    opciones_pokemon.value = nombres_pokemon[contadorsito];

                    if (contadorsito === 0) {
                        opciones_pokemon.value = "vacio";
                    }

                } else {

                    opciones_pokemon.innerHTML = contadorsito;
                    opciones_pokemon.value = contadorsito;

                    if (contadorsito === 0) {
                        opciones_pokemon.innerHTML = `Seleccione ID Pokemon`;
                        opciones_pokemon.value = "vacio";
                    }

                }

                listbox_pokemon_selector.appendChild(opciones_pokemon);

            }

        } else {

            listbox_pokemon_selector.disabled = true;

        }

        boton_filtro.disabled = true;
        boton_filtro.classList.remove("fondo_boton_aceptado");

    });

    for (let contador = 0; contador < opciones_rango.length; contador++) {
        var opcionesListBox = document.createElement("option");
        opcionesListBox.innerHTML = opciones_rango[contador];
        opcionesListBox.value = contador;
        listBoxSelector.appendChild(opcionesListBox);
    }

    boton_filtro.innerHTML = "Buscar";
    boton_filtro.disabled = true;
    boton_filtro.setAttribute("id", "boton_buscar_pokemon");
    boton_filtro.addEventListener("click", verificar_existencia);

    buscador_pokemon.appendChild(listBoxSelector);
    buscador_pokemon.appendChild(listbox_pokemon_selector);
    buscador_pokemon.appendChild(boton_filtro);
    
    document.body.appendChild(buscador_pokemon);

}

function verificar_existencia() {

    var flujo = "";
    var contenedor_principal = document.getElementById("contenedor_informacion_pokemon");
    var tamama = contenedor_principal.childNodes.length;

    if (tamama == 0) {
        flujo = "nuevo";
    } else {
        flujo = "usado";
    }

    validar_buscar_pokemon(flujo);

}