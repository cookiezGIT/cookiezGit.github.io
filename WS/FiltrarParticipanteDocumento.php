<?php

$file = fopen("configura.txt", "r");
$Dir ="";
while(!feof($file)) { $Dir = fgets($file);} fclose($file);
$servicio = $Dir; 

$tipoDoc = $_POST["tipo-doc"];
$numDoc = $_POST["numero-documento"];
$parametros= array('ID_TIPO_DOCUMENTO' => "28",
                   'NU_DOCUMENTO' => $numDoc);

$client = new SoapClient($servicio, []);
$result = $client->FiltrarParticipanteDocumento($parametros);

$outp = json_encode($result->FiltrarParticipanteDocumentoResult->BE_Participante);

echo $outp;


?>