var global_paso = 0;

function crear_informacion_uso() {

    let contenedor = document.createElement("div");
    contenedor.setAttribute("id", "instrucciones_uso");
    document.body.appendChild(contenedor);
    global_paso = 0;
    mostrar_paso_actual();

}

function mostrar_paso_actual(){

    let contenedor = document.getElementById("instrucciones_uso");
    contenedor.innerHTML = "";
    contenedor.appendChild(crear_paso());

}

function crear_paso() {

    let iniciar = 0;
    let limite  = 0;
    let textos  = [
        '>>> El siguiente es un buscador de pokemon de la primera generacion donde podras ver las propiedades basicas de cada pokemon.',
        '>>> Para buscar un pokemon debes hacer click en el icono de lupa junto al cerrar sesion.',
        '>>> Cuando se despliegue el contenedor podras ingresar en un campo de texto el nombre del pokemon que deseas buscar.',
        '>>> En caso de no recordar el nombre solo escribe alguna letra para que se desplieguen los textos de ayuda.',
        '>>> Estos textos de ayuda al darles click se plasmaran en el campo para no tengas necesidad de escribir el nombre completo cuando ya lo tengas localizado.',
        '>>> Junto al campo nombre de pokemon, esta el campo limite, el cual permite buscar los pokemon siguientes en la lista de pokemon.',
        '>>> Para usarlo debes ingresar algun numero entero que servira como el tope buscador de los siguientes pokemon.',
        '>>> Cuando haya aparecido la imagen con el nombre del respectivo pokemon, debes darle click para que aparezca el panel con sus propiedades',
        '>>> Ejemplo: Si escribes Charmander, y en el limite marcas 3 te buscara al Chamander y los tres siguientes pokemon'
    ];

    switch (global_paso) {
        case 0:
            limite = 4;
            break;
        case 1:
            iniciar = 4;
            limite  = 8;
            break;
        case 2:
            iniciar = 8;
            limite  = 9;
            break;
        default:
            break;
    }

    let conte  = document.createElement("div");
    let titulo = document.createElement("h1");

    titulo.innerHTML = "Intrucciones de Uso";
    conte.appendChild(titulo);

    // MOSTRAR CONTENIDO DE CADA PASO
    for (let index = iniciar; index < limite; index++) {
        let primero = textos[index];
        let parrafo = document.createElement("p");
        parrafo.innerHTML = primero;
        conte.appendChild(parrafo);
    }

    // MOSTRAR PASO FINAL CON IMAGENES
    if (global_paso === 2) {
        let imagenes = ['ejm1.PNG', 'ejm2.PNG', 'ejm3.PNG'];
        let image_contenedo = document.createElement("div");     
        image_contenedo.setAttribute("id", "contenedor_imagenes");  
        for (let detalle of textos) {
            let parrafo = document.createElement("p");
            parrafo.innerHTML = detalle;
        }
        for (let ima_sec of imagenes) {
            let imagen_nueva = document.createElement("img");
            imagen_nueva.id = ima_sec;
            imagen_nueva.src = `../recursos/imagenes/ejemplos/${ima_sec}`;
            image_contenedo.appendChild(imagen_nueva);
        }
        conte.appendChild(image_contenedo);
    }

    conte.appendChild(crear_botones());
    return conte;

}

function crear_botones() {
    
    let contenedor = document.createElement("div");
    let elementos = [
        {
            tipo: "Anterior",
            clas: "fa-arrow-left"
        },
        {
            tipo: "Siguiente",
            clas: "fa-arrow-right"
        }
    ];

    for (let contador = 0; contador < elementos.length; contador++) {

        let elementos_tipo = elementos[contador].tipo;
        let elementos_clas = elementos[contador].clas;
        let conte_inte = document.createElement("div");
        let icono      = document.createElement("i");
        let texto      = document.createElement("p");
        
        icono.classList.add("fa");
        icono.classList.add(elementos_clas);
        texto.innerHTML = elementos_tipo;

        if (contador === 0) {
            conte_inte.appendChild(icono);
            conte_inte.appendChild(texto);
            conte_inte.addEventListener("click", ()=> manejarPaginacion(-1));
        } else {
            conte_inte.appendChild(texto);
            conte_inte.appendChild(icono);
            conte_inte.addEventListener("click", ()=> manejarPaginacion(1));
        }

        if (global_paso === 0 && contador === 0 || global_paso === 2 && contador === 1) {
            conte_inte.style.visibility = "hidden";
        }

        contenedor.appendChild(conte_inte);
        
    }

    contenedor.setAttribute("id", "botones_pagina");
    return contenedor;

}

function manejarPaginacion(contador) {

    global_paso += contador;
    mostrar_paso_actual();
    
}