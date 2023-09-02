<?php
/*Datos de conexion a la base de datos*/
$db_host = "localhost";
$db_user = "root";
$db_pass = "";
$db_name = "formulariosgilmerrangel";
$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);
if (!$conn->set_charset("utf8")) {
    printf("", $conn->error);
} else {
    printf("", $conn->character_set_name());
}
if ($conn->connect_errno) {
    printf("Falló la conexión: %s\n", $mysqli->connect_error);
    exit();
}
