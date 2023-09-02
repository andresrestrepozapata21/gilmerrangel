<?php
//Defino los include de la base de datos y seteo la zona horaria
date_default_timezone_set('America/Bogota');
include("../conection/conection_server.php");
//Capturo las variables necesarias que vienen en la peticion
$nombre = $_POST['nombre'];
$correo = $_POST['correo'];
$telefono = $_POST['telefono'];
$mensaje = $_POST['mensaje'];
//defino la fecha
$fecha = date('Y-m-d h:i:s');
//armo mi SQL INSERT con las varalbles
$insert =  "INSERT INTO formularios (nombre, correo, telefono, mensaje, fecha) VALUES ('$nombre','$correo','$telefono','$mensaje','$fecha')";
//si los numeros coinciden hago el query de la sql INSERT
$result = mysqli_query($conn, $insert);
//si la consulta fue exitosa
if ($result) {
    //Definimos las variables para enviar el SMS consumiendo la API de mipgenliena.com
        //defino el mensaje
        $mensaje = 'Hola %nombre%, soy Gilmer Rangel, tu proximo Alcalde. Gracias por enviarme tu mensaje. Pronto te escribire. Un abrazo';
        //reemplazo el nombre del usuario
        $mensaje = str_replace("%nombre%", $nombre, $mensaje);
        //defino URL, datos del consumo para enviar el SMS
        $url = 'http://api.mipgenlinea.com/serviceSMS.php';
        $data = array(
            "usuario" => "smsFoxUser",
            "password" => "rhjIMEI3*",
            "telefono" => "+57" . $telefono,
            "mensaje" => $mensaje,
            "aplicacion" => "SMS Test Unitario",
        );
        $json = json_encode($data);
        $header = array('Content-Type: application/json');
        //llamo el metodo CURL para consumir mi API SMS y guardo registro en un LOG
        $result_SMS_cliente = CallAPI($url, $json, $header);
        file_put_contents('../log_sms_formulario_' . date("j.n.Y") . '.txt', '[' . date('Y-m-d H:i:s') . ']' . " SMS API -> TELEFONO USUARIO:" . $telefono . " - " . $result_SMS_cliente . ",\n\r", FILE_APPEND);
    //regreso comentario registrado exitosamente
    echo json_encode('Tu mensaje ha sido enviado con exito.');
} else {
    //si algo salio mal en la consulta
    echo json_encode('error');
}

//Metodo para llamar a la api de los sms
function CallAPI($url, $json, $header)
{
    $curl = curl_init();

    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($curl, CURLOPT_POST, 1);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $json);
    curl_setopt($curl, CURLOPT_HTTPHEADER, $header);

    $response = curl_exec($curl);
    $status = curl_getinfo($curl, CURLINFO_HTTP_CODE);

    curl_close($curl);

    return $response;
}