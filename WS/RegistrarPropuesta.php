<?php

$file = fopen("configura.txt", "r");
$Dir ="";
while(!feof($file)) { $Dir = fgets($file);} fclose($file);


$titulo = $_POST["titulo"];
$modalidad = $_POST["modalidad"];
$lineaTematica = $_POST["numero-documento"];
$nivelEducativo = $_POST["nombre"];
$otro = $_POST["apellido-materno"];


$servicio = $Dir;
$parametros= array('TITULO_PROP' => $titulo,
	'TX_DESCRIPCION_FOTO_VIDEO' => '',
	'TX_LUGAR_TOMA_FOTO' => '',
	'FH_FECHA_TOMA_FOTO' => '',
	'TX_URL_VIDEO' => '',
	'GRU_MODALIDAD' => $modalidad,
	'GRU_LINEA_TEMATICA' => $lineaTematica,
	'GRU_NIVEL_EDUCATIVO' => $nivelEducativo,
	'GRU_CATEGORIA_FOTO' => '',
	'GRU_CATEGORIA_VIDEO' => '',
	'LINEA_TEMATICA_OTRO' => $otro,
	'RPTA' => '10',
	'MENS' => '');

$client = new SoapClient($servicio, []);
$result = $client->RegistrarPropuesta($parametros);
$outp = json_encode($result);
echo $outp;	

?>
