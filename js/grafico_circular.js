function barras_circulares_habilidades(pokemon_identificador, contenedor_enviar_elementos, nombres_extraidos){

    console.log(pokemon_identificador);
    console.log(contenedor_enviar_elementos);
    console.log(nombres_extraidos);

    for (let contador = 0; contador < 6; contador++) {

        let principal = document.createElement("div");
        let svg_principal = document.createElement("svg");
        let propiedad_circle_uno = document.createElement("circle");
        let propiedad_circle_dos = document.createElement("circle");

        propiedad_circle_uno.setAttribute("cx", "70");
        propiedad_circle_dos.setAttribute("cx", "70");
        propiedad_circle_uno.setAttribute("cy", "70");
        propiedad_circle_dos.setAttribute("cy", "70");
        propiedad_circle_uno.setAttribute("r", "70");
        propiedad_circle_dos.setAttribute("r", "70");

        svg_principal.appendChild(propiedad_circle_uno);
        svg_principal.appendChild(propiedad_circle_dos);
        principal.appendChild(svg_principal);
        contenedor_enviar_elementos.appendChild(principal);
        
    }

}