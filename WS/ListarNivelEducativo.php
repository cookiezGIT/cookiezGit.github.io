<?php

$file = fopen("configura.txt", "r");
$Dir ="";
while(!feof($file)) { $Dir = fgets($file);} fclose($file);


$servicio = $Dir; 
$parametros= array("Id_Apliacacion" => $_POST["idApp"]);
$client = new SoapClient($servicio, $parametros);
$result = $client->ListarNivelEducativo($parametros);

$outp = json_encode($result->ListarNivelEducativoResult->BE_NivelEducativo);

echo $outp;


?>