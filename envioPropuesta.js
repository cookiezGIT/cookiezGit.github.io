function enviarPropuesta(){
	var propuesta = {
		modalidad: $('#modalidades').val(),
		participantes: participantes,
		tematica: $('#tematica').val(),
		nivelEducativo: $('#nivel-educativo').val(),
		titulo: $('#nivel-educativo').val()
	};
	console.log(propuesta);
}

$('#enviar-propuesta').click(enviarPropuesta);