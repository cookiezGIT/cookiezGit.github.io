<?php

$file = fopen("configura.txt", "r");
$Dir ="";
while(!feof($file)) { $Dir = fgets($file);} fclose($file);
$servicio = $Dir; 

$email = $_POST["email"];
$app = $_POST["app"];

$parametros= array('Email' => $email,
                   'Aplicacion' => $app,
                   'Rpta' => "1",
                   'Mensaje' => "a");

$client = new SoapClient($servicio, []);
$result = $client->GeneraTokenMail($parametros);

$outp = json_encode($result);

echo $outp;

?>