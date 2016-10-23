<?php

$file = fopen("configura.txt", "r");
$Dir ="";
while(!feof($file)) { $Dir = fgets($file);} fclose($file);


$servicio = $Dir; 
$parametros= [];
$client = new SoapClient($servicio, $parametros);
$result = $client->BuscarParticipante($parametros);

$outp = json_encode($result->BuscarParticipanteResult->BE_Categoria);

echo $outp;


?>