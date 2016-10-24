<?php

$file = fopen("configura.txt", "r");
$Dir ="";
while(!feof($file)) { $Dir = fgets($file);} fclose($file);


$tipoDoc = $_POST["tipo-doc"];
$numDoc = $_POST["numero-documento"];
$nombre = $_POST["nombre"];
$apMat = $_POST["apellido-materno"];
$apPat = $_POST["apellido-paterno"];
$email = $_POST["email"];
$telf = $_POST["telefono"];
$institucion = $_POST["institucion"];
$pais = $_POST["pais"];

$servicio = $Dir;
$parametros= array('RPTA' => '10');

$client = new SoapClient($servicio, []);
$result = $client->RegistrarPropuesta($parametros);
$outp = json_encode($result->RegistrarPropuestaResponse);
echo $outp;	

?>
