function validarPropuesta(propuesta){
	for (var prop in propuesta){
		if( propuesta.hasOwnProperty( prop ) ) {
			if (propuesta[prop] === null || propuesta[prop] === undefined || propuesta[prop] == "") {
				showErrorMessage('Debe ingresar un(a) '.concat(prop, '.'));		
				return false;	
			}
		} 
	}
}

function enviarPropuesta(){
	var propuesta = {
		modalidad: $('#modalidades').val(),
		participantes: participantes,
		tematica: $('#tematica').val(),
		nivelEducativo: $('#nivel-educativo').val(),
		titulo: $('#nivel-educativo').val()
	};
	var isValid = validarPropuesta(propuesta);
	console.log(propuesta);
}

$('#enviar-propuesta').click(enviarPropuesta);