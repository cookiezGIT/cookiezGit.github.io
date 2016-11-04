'use strict';

function obtenerFotografiaActual(){
	var fechaString = $('#div-fecha-toma input[name="_submit"]').val();
	var fechaSplit = fechaString.split('/');
	var date = new Date(fechaSplit[0], fechaSplit[1] - 1, fechaSplit[2]);

	var fotografia = {
		titulo: $('#foto-titulo').val(),
		lugar: $('#foto-lugar').val(),
		fecha: date.toISOString(),
		descripcion: $('#foto-descripcion').val()
	};

	console.log(fotografia);
	return fotografia;
}

function guardarFotografia(fotografia){
	$.post('http://demo1779969.mockable.io/relmepost', fotografia)
		.done(function(data){
			console.log(data);
		})
		.fail(function(){
			console.error('error de conexion');
		});
}

function onEnviarFotografia(){
	guardarFotografia(obtenerFotografiaActual());
}

$('#foto-finalizar').click(onEnviarFotografia);