function barras_circulares_habilidades(pokemon_identificador, contenedor_enviar_elementos){

    console.log(pokemon_identificador);

    let pruebas = pokemon_identificador[6];
    let titulo = document.createElement("h1");
    let principal = document.createElement("div");

    principal.classList.add("contenedor_svg");
    titulo.innerHTML = "Estadisticas Primarias";
    titulo.style.textAlign = "center";
    contenedor_enviar_elementos.appendChild(titulo);

    for (let contador = 0; contador < pruebas.length; contador++) {

        let relleno            = 50;
        let pos_x              = 100;
        let pos_y              = 100;
        let limite_angulo      = 440;
        let pos_y_texto_porce  = 110;
        let color_porcentaje   = "navy";
        let color_fondo        = "gray";
        let url_svg            = "http://www.w3.org/2000/svg";
        let item_arreglo       = pruebas[contador].split(":");
        let numero_calcular    = item_arreglo[1];
        let svg_principal      = document.createElementNS(url_svg, "svg");
        let svg_propiedad      = svg_principal.namespaceURI;
        let circle_uno         = document.createElementNS(svg_propiedad, "circle");
        let circle_dos         = document.createElementNS(svg_propiedad, "circle");
        let circle_lbl         = document.createElementNS(svg_propiedad, "text");
        let circle_porce       = document.createElementNS(svg_propiedad, "text");
        let circle_porce_total = document.createElementNS(svg_propiedad, "text");
        let modificador        = numero_calcular * 100 / 200;
        let arigmetico         = modificador * limite_angulo / 100;

        circle_uno.setAttribute("cx", pos_x);
        circle_uno.setAttribute("cy", pos_y);
        circle_uno.setAttribute("r", relleno);
        circle_uno.setAttribute('stroke', color_porcentaje);
        circle_uno.setAttribute('stroke-dasharray', limite_angulo);
        circle_uno.setAttribute('stroke-dashoffset', 0);

        circle_dos.setAttribute("cx", pos_x);
        circle_dos.setAttribute("cy", pos_y);
        circle_dos.setAttribute("r", relleno);
        circle_dos.setAttribute('stroke', color_fondo);
        circle_dos.setAttribute('stroke-dasharray', limite_angulo);
        circle_dos.setAttribute('stroke-dashoffset', arigmetico);

        circle_lbl.setAttribute("x", "50%");
        circle_lbl.setAttribute("y", 185);
        circle_lbl.setAttribute("text-anchor", "middle");

        circle_porce.setAttribute("x", "61%");
        circle_porce.setAttribute("y", pos_y_texto_porce);
        circle_porce.setAttribute("text-anchor", "middle");
        circle_porce.setAttribute("font-size", "12px");

        circle_porce_total.setAttribute("x", "50%");
        circle_porce_total.setAttribute("y", pos_y_texto_porce);
        circle_porce_total.setAttribute("text-anchor", "middle");
        circle_porce_total.setAttribute("font-size", "30px");

        circle_porce.innerHTML       = "%";
        circle_porce_total.innerHTML = parseInt(modificador);
        circle_lbl.innerHTML         = item_arreglo[0];

        svg_principal.setAttribute("viewBox", "0 0 200 200");
        svg_principal.appendChild(circle_lbl);
        svg_principal.appendChild(circle_uno);
        svg_principal.appendChild(circle_dos);
        svg_principal.appendChild(circle_porce_total);
        svg_principal.appendChild(circle_porce);
        principal.appendChild(svg_principal);
                
    }

    contenedor_enviar_elementos.appendChild(principal);

}