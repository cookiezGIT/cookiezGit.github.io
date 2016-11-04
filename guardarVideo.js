'use strict';

function obtenerFotografiaActual(){
	var video = {
		titulo: $('#video-titulo').val(),
		descripcion: $('#video-descripcion').val(),
		link: $('#video-link').val()
	};
	console.log(video);
	return video;
}

function guardarVideo(Video){
	$.post('http://demo1779969.mockable.io/relmeost', Video)
		.done(function(data){
			console.log(data);
		})
		.fail(function(){
			console.error('error de conexion');
		});
}

function onEnviarVideo(){
	guardarVideo(obtenerFotografiaActual());
}

$('#video-finalizar').click(onEnviarVideo);