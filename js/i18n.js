async function obtener_nombre_application(key_buscar_elemento) {
    var retorno_final = await promise_ajax(key_buscar_elemento)
        .then((item_coincidencia) => {

            return item_coincidencia;

        }).catch((error) => {

            console.log(error);
            return "vacio";

        });
    
    return retorno_final;

}

async function promise_ajax(key_buscar_elemento) {
    return new Promise((resolve, reject)=>{
        var peticion = new XMLHttpRequest();
        
        peticion.onreadystatechange = () => {
            if (peticion.readyState == 4 && peticion.status == 200) {

                let datos = JSON.parse(peticion.responseText);

                for (let contador = 0; contador < datos.textos.length; contador++) {
                    let referencia = datos.textos[contador];
                    if (referencia[0] === key_buscar_elemento) {
                        resolve(referencia[1]);
                        break;
                    }
                }

            }
        };

        peticion.onerror = () => {
            reject(new Error("Network Error"));
        };

        peticion.open("GET", "../recursos/json/textosAPP.json");
        peticion.send();

    });
}