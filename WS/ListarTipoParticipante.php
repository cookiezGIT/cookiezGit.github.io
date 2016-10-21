<?php

$file = fopen("configura.txt", "r");
$Dir ="";
while(!feof($file)) { $Dir = fgets($file);} fclose($file);


$servicio = $Dir; 
$parametros= [];
$client = new SoapClient($servicio, $parametros);
$result = $client->ListarTipoParticipante($parametros);

$outp = json_encode($result->ListarTipoParticipanteResult->BE_TipoParticipante);

echo $outp;


?>