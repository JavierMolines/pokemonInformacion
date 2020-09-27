function manejar_vista_item(select) {

    let icono = select.target;

    if (typeof (icono.className) === 'string' && icono.className !== "") {

        let flujo = 99;
        let texto_clase = icono.className;
        let formateo = texto_clase.replace("fa fa-", "");

        switch (formateo) {
            case "info-circle fa-search":
                flujo = 0;
                break;
            case "search":
                flujo = 1;
                break;
            case "power-off":
                flujo = 10;
                break;
            default:
                break;
        }

        if (flujo === 10) {

            cerrar_sesion();

        } else if (flujo !== 99) {

            validar_vista_mostrar_interfaz(flujo);

        }
    }
}

function validar_vista_mostrar_interfaz(flujo) {

    let componentes = [
        ["instrucciones_uso", crear_informacion_uso, 0],
        ["contenedor_filtro_pokemon", crear_filtro_pokemon, 1],
    ];

    for (let contador = 0; contador < componentes.length; contador++) {

        let indice   = componentes[contador][0];
        let funcion  = componentes[contador][1];
        let views    = componentes[contador][2];
        let crear    = flujo === views ? true : false;
        let pantalla = document.getElementById(indice);

        if (pantalla == null || pantalla == undefined) {
            if(crear === true){
                funcion();
            }
        } else {
            pantalla.remove();
        }
    }
}