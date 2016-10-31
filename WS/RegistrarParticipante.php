<?php

$file = fopen("configura.txt", "r");
$Dir ="";
while(!feof($file)) { $Dir = fgets($file);} fclose($file);

$idParticipante = $_POST["id-participante"];
$idPropuesta = $_POST["id-propuesta"];
$tipoDoc = $_POST["tipo-doc"];
$numDoc = $_POST["numero-documento"];
$nombre = $_POST["nombre"];
$apMat = $_POST["apellido-materno"];
$apPat = $_POST["apellido-paterno"];
$email = $_POST["email"];
$telf = $_POST["telefono"];
$institucion = $_POST["institucion"];
$pais = $_POST["pais"];
$tipoParticipante= $_POST["tipo-participante"];

$servicio = $Dir;
$parametros= array('ID_PROPUESTA_REGISTRO' => $idPropuesta,
                   'ID_PARTICIPANTE' => $idParticipante,
                   'GRUPO_TIPO_PARTICIPANTE' => $tipoParticipante,
                   'ID_TIPO_DOCUMENTO' => $tipoDoc,
                   'ID_PAIS' => $pais,
                   'ID_GRADO_INSTRUCCION' => "2",
                   'NU_DOCUMENTO' => $numDoc,
                   'NO_NOMBRE' => $nombre,
                   'NO_APELLIDO_PATERNO'  => $apPat,
                   'NO_APELLIDO_MATERNO'     => $apMat,
                   'NO_EMAIL' => $email,
                   'NU_TELEFONO'    => $telf,
                   'NO_INSTITUCION'    => $institucion,
                   'RPTA'    => "60",
                   'MENS'    => "1");
$client = new SoapClient($servicio, []);
$result = $client->RegistrarParticipantePropuesta($parametros);

$outp = json_encode($result);

echo $outp;

?>
