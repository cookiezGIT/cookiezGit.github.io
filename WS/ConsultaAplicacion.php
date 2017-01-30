<?php

$file = fopen("configura.txt", "r");
$Dir ="";
while(!feof($file)) { $Dir = fgets($file);} fclose($file);
$servicio = $Dir; 

$parametros= array('CO_APLICACION' => "RELME");

$client = new SoapClient($servicio, []);
$result = $client->ConsultaAplicacion($parametros);

$outp = json_encode($result->ConsultaAplicacionResult->BE_Aplicacion);

echo $outp;


?>