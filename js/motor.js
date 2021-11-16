function cargarJSON1(result1, search) {
    /*
    Div, String --> none
    la función recibe el div objetivo donde cargar el html y la cadena que indica que buscamos
    no retorna nada sino que rellena el div con el resultado de la búsqueda
    */

    var ajax1 = new XMLHttpRequest();
    ajax1.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var obj0 = this.responseText;
            var obj1 = JSON.parse(obj0);
            var obj2 = obj1["datos"];

            var resultado = "";
            for (let index = 0; index < obj2.length; index++) {
                /*
                Para todos los objetos que encontremos en json generaremos un valor en resultado
                con el código html para inyectarlo en la página después y ahorrar los tiempos de carga
                */
                if (search === obj2[index].articulo.substring(0, search.length) && search.length > 0) {
                    resultado += "<div><a href='detalle.php?ide=" + obj2[index].ide + "'><div><img class='imagen' src='" + obj2[index].ruta + "'></div><div><h3 class='nombre'>" + obj2[index].articulo + "</h3></div><div><p class='dinero'>" + obj2[index].pvp + "€</p></div></a></div>";
                }

            }
            //Incorporamos a nuestro HTML los resultados del json
            document.getElementById(result1.id).innerHTML = resultado;
        }
    };
    ajax1.open("GET", "json/db1.json");
    ajax1.send();
}

function cargarJSONOnLoad(result1) {
    /*
    Div --> none
    rellena el div cuando se carga la página
    */

    var ajax1 = new XMLHttpRequest();
    ajax1.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var obj0 = this.responseText;
            var obj1 = JSON.parse(obj0);
            var obj2 = obj1["datos"];

            var resultado = "";
            for (let index = 0; index < obj2.length; index++) {
                /*
                Generamos la tienda entera pre-búsqueda
                */

                resultado += "<div><a href='detalle.php?ide=" + obj2[index].ide + "'><div><img class='imagen' src='" + obj2[index].ruta + "'></div><div><h3 class='nombre'>" + obj2[index].articulo + "</h3></div><div><p class='dinero'>" + obj2[index].pvp + "€</p></div></a></div>";


            }
            //Incorporamos a nuestro HTML los resultados del json
            document.getElementById(result1.id).innerHTML = resultado;
        }
    };
    ajax1.open("GET", "json/db1.json");
    ajax1.send();
}


window.addEventListener("load", function(event) {
    /*
    null --> null
     */
    const body1 = document.body;
    if (body1.id == "index1") {
        const result1 = document.getElementById("resultado1");
        const search = document.getElementById("campo1");
        cargarJSONOnLoad(result1);
        //Keyup implica que cada vez que el usuario esté escribiendo y levante una tecla salta el evento
        search.addEventListener("keyup", function() {
            /*Cogemos cada vez que salte el evento el contenido del campo, para simular la lectura en tiempo real
            de la barra de busqueda*/
            const search = document.getElementById("campo1").value.toLowerCase();
            if (search === "") {
                cargarJSONOnLoad(result1)
            } else {
                //Pasamos el texto de busqueda mediante la funcion ignoreAccents(String)
                cargarJSON1(result1, ignoreAccents(search));
            }

        })
    } else if (body1.id == "detalle1") {
        const result1 = document.getElementById("resultado1");
        cargarDetalleJSON(this.id, result1);
    }


})

function cargarDetalleJSON(div, id) {
    /*
    Div, int --> none
    la función recibe el div objetivo donde cargar el html y el id de la prenda a mostrar
    */
    var ajax1 = new XMLHttpRequest();
    ajax1.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var obj0 = this.responseText;
            var obj1 = JSON.parse(obj0);
            var obj2 = obj1["datos"];

            let resultado = "";
            for (let index = 0; index < obj2.length; index++) {
                /*
                Para todos los objetos que encontremos en json generaremos un valor en resultado
                con el código html para inyectarlo en la página después y ahorrar los tiempos de carga
                */
                if (obj2[index].ide == id) {
                    resultado += "<div><a href='detalle.php?ide=" + obj2[index].ide + "'><div><img class='imagen' src='" + obj2[index].ruta + "'></div><div><h3 class='nombre'>" + obj2[index].articulo + "</h3></div><div><p class='dinero'>" + obj2[index].pvp + "€</p></div></a></div>";
                }


            }
            //Incorporamos a nuestro HTML los resultados del json
            document.getElementById(div.id).innerHTML = resultado;
        }
    };
    ajax1.open("GET", "json/db1.json");
    ajax1.send();
}

function ignoreAccents(text) {
    /*
    String --> String
    devuelve una cadena de texto de entrada sin acentos del español
    */
    let returnIgnoredAccents = text.replace("á", "a");
    returnIgnoredAccents = returnIgnoredAccents.replace("é", "e");
    returnIgnoredAccents = returnIgnoredAccents.replace("í", "i");
    returnIgnoredAccents = returnIgnoredAccents.replace("ó", "o");
    returnIgnoredAccents = returnIgnoredAccents.replace("ú", "u");
    console.log(returnIgnoredAccents)
    return returnIgnoredAccents;
}