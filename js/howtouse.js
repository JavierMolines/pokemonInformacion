function crear_informacion_uso() {

    let textos = [
        '* El siguiente es un buscador de pokemon de la primera generacion donde podras ver las propiedades basicas de cada pokemon.',
        '* Para buscar un pokemon debes hacer click en el icono de lupa junto al cerrar sesion.',
        '* Cuando se despliegue el contenedor podras ingresar en un campo de texto el nombre del pokemon que deseas buscar.',
        '* En caso de no recordar el nombre solo escribe alguna letra para que se desplieguen los textos de ayuda.',
        '* Estos textos de ayuda al darles click se plasmaran en el campo para no tengas necesidad de escribir el nombre completo cuando ya lo tengas localizado.',
        '* Junto al campo nombre de pokemon, esta el campo limite, el cual permite buscar los pokemon siguientes en la lista de pokemon.',
        '* Para usarlo debes ingresar algun numero entero que servira como el tope buscador de los siguientes pokemon.',
        '* Cuando haya aparecido la imagen con el nombre del respectivo pokemon, debes darle click para que aparezca el panel con sus propiedades',
        '* Ejm: Si escribes Charmander, y en el limite marcas 3 te buscara al Chamander y los tres siguientes pokemon'
    ];
    let imagenes        = ['ejm1.PNG', 'ejm2.PNG', 'ejm3.PNG'];
    let contenedor      = document.createElement("div");
    let informacion_uso = document.createElement("div");
    let image_contenedo = document.createElement("div");
    let titulo          = document.createElement("h1");

    contenedor.setAttribute("id", "instrucciones_uso");
    informacion_uso.appendChild(titulo);
    titulo.innerHTML = "Intrucciones de Uso";

    for (let detalle of textos) {

        let parrafo = document.createElement("p");
        parrafo.innerHTML = detalle;
        informacion_uso.appendChild(parrafo);
        
    }

    for (let ima_sec of imagenes) {

        let imagen_nueva = document.createElement("img");
        imagen_nueva.id = ima_sec;
        imagen_nueva.src = `../recursos/imagenes/ejemplos/${ima_sec}`;
        image_contenedo.appendChild(imagen_nueva);
        
    }

    informacion_uso.appendChild(image_contenedo);
    contenedor.appendChild(informacion_uso);
    document.body.appendChild(contenedor);

}