function barras_circulares_habilidades(pokemon_identificador, contenedor_enviar_elementos, nombres_extraidos){

    //console.log(pokemon_identificador[6]);
    //console.log(contenedor_enviar_elementos);
    //console.log(nombres_extraidos);

    let pruebas = pokemon_identificador[6];
    let principal = document.createElement("div");
    principal.classList.add("contenedor_svg");

    for (let contador = 0; contador < pruebas.length; contador++) {

        let relleno = 50;
        let pos_x = 100;
        let pos_y = 100;
        let limite_angulo = 440;
        let color_porcentaje = "navy";
        let color_fondo = "gray";
        let url_svg = "http://www.w3.org/2000/svg";
        let item_arreglo = pruebas[contador].split(":");
        let numero_calcular = item_arreglo[1];
        let svg_principal = document.createElementNS(url_svg, "svg");
        let svg_propiedad = svg_principal.namespaceURI;
        let propiedad_circle_uno = document.createElementNS(svg_propiedad, "circle");
        let propiedad_circle_dos = document.createElementNS(svg_propiedad, "circle");
        let propiedad_circle_lbl = document.createElementNS(svg_propiedad, "text");
        let propiedad_circle_porce = document.createElementNS(svg_propiedad, "text");
        let propiedad_circle_porce_total = document.createElementNS(svg_propiedad, "text");
        let modificador = numero_calcular * 100 / 200;
        let arigmetico = modificador * limite_angulo / 100;

        propiedad_circle_uno.setAttribute("cx", pos_x);
        propiedad_circle_uno.setAttribute("cy", pos_y);
        propiedad_circle_uno.setAttribute("r", relleno);
        propiedad_circle_uno.setAttribute('stroke', color_porcentaje);
        propiedad_circle_uno.setAttribute('stroke-dasharray', limite_angulo);
        propiedad_circle_uno.setAttribute('stroke-dashoffset', 0);

        propiedad_circle_dos.setAttribute("cx", pos_x);
        propiedad_circle_dos.setAttribute("cy", pos_y);
        propiedad_circle_dos.setAttribute("r", relleno);
        propiedad_circle_dos.setAttribute('stroke', color_fondo);
        propiedad_circle_dos.setAttribute('stroke-dasharray', limite_angulo);
        propiedad_circle_dos.setAttribute('stroke-dashoffset', arigmetico);

        propiedad_circle_lbl.setAttribute("x", "50%");
        propiedad_circle_lbl.setAttribute("y", 185);
        propiedad_circle_lbl.setAttribute("text-anchor", "middle");

        propiedad_circle_porce.setAttribute("x", "61%");
        propiedad_circle_porce.setAttribute("y", 110);
        propiedad_circle_porce.setAttribute("text-anchor", "middle");
        propiedad_circle_porce.setAttribute("font-size", "12px");

        propiedad_circle_porce_total.setAttribute("x", "50%");
        propiedad_circle_porce_total.setAttribute("y", 110);
        propiedad_circle_porce_total.setAttribute("text-anchor", "middle");
        propiedad_circle_porce_total.setAttribute("font-size", "30px");

        propiedad_circle_porce.innerHTML       = "%";
        propiedad_circle_porce_total.innerHTML = parseInt(modificador);
        propiedad_circle_lbl.innerHTML         = item_arreglo[0];

        svg_principal.setAttribute("viewBox", "0 0 200 200");
        svg_principal.appendChild(propiedad_circle_lbl);
        svg_principal.appendChild(propiedad_circle_uno);
        svg_principal.appendChild(propiedad_circle_dos);
        svg_principal.appendChild(propiedad_circle_porce_total);
        svg_principal.appendChild(propiedad_circle_porce);
        principal.appendChild(svg_principal);
                
    }

    contenedor_enviar_elementos.appendChild(principal);

}