<?php

$file = fopen("configura.txt", "r");
$Dir ="";
while(!feof($file)) { $Dir = fgets($file);} fclose($file);


$servicio = $Dir; 
$parametros= [];
$client = new SoapClient($servicio, $parametros);
$result = $client->ListarTipoDocumento($parametros);

$outp = json_encode($result->ListarTipoDocumentoResult->BE_TipoDocumento);

echo $outp;


?>