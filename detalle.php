<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Detalle de prenda</title>
    <link rel="stylesheet" href="css/style.css">
    <script src="js/motor.js"></script>
</head>
<body id="detalle1">
    
    <div id="contenedor1">&nbsp;
        <?php 
            //Lectura de fichero JSON
            $json = file_get_contents('json/db1.json');
            //Decodificacion y volcado en una matriz del JSON
            $json_data = json_decode($json, true);
            //Recorrido de los datos de JSON
            //De datos los metemos en values
            foreach ($json_data['datos'] as $values) {
                if ($values['ide'] == $_GET['ide']){
                    echo "<section id='info'><div><img src='" . $values['ruta'] . "'></div><div id='infoProd'><div class='text'>" . $values['articulo'] . "</div>";
                    echo "<div class='money'><input type='text' id='discount' placeholder='promo code'>PVP sin iva = " . $values['pvp'] . "€</div>";
                    echo "<div class='desc'><h4>" . $values['desc'] . "</div>";
                    echo "<div id='money'>PVP con iva = " . round($values['pvp'] + $values['pvp']*0.21, 2) . "€</div>";
                    echo "<div id='divVenta'><a src='' id='venta'>Comprar ya</a></div></div></section>";
                }    
            }
        ?>
    </div>
</div>
    

</body>
</html>