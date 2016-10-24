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
$parametros= array('ID_TIPO_DOCUMENTO' => "28",
                   'ID_GRADO_INSTRUCCION' => "2",
                   'ID_PAIS' => $pais,
                   'NU_DOCUMENTO' => $numDoc,
                   'NO_NOMBRE' => $nombre,
                   'NO_APELLIDO_PATERNO'  => $apPat,
                   'NO_APELLIDO_MATERNO'     => $apMat,
                   'NU_TELEFONO'    => $telf,
                   'NO_INSTITUCION'    => $institucion,
                   'RPTA'    => "0",
                   'MENS'    => "1");
$client = new SoapClient($servicio, []);
$result = $client->RegistrarParticipante($parametros);

$client = new SoapClient($servicio, array('exceptions'=>true));
$result = $client->RegistrarParticipante($parametros);
$outp = json_encode($result->RegistrarParticipanteResponse);

$variable = $client->__getLastRequestHeaders();
echo $outp;

?>
