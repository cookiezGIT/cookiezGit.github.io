function validarPropuesta(propuesta){
	for (var prop in propuesta){
		if( propuesta.hasOwnProperty( prop ) ) {
			if (propuesta[prop] === null || propuesta[prop] === undefined || propuesta[prop] == '') {
				showErrorMessage('Debe ingresar un(a) '.concat(prop, '.'), '#datos-notificaciones');		
				return false;	
			}
		} 
	}
}

function enviarPropuesta(){
	var propuesta = {
		modalidad: $('#modalidades').val(),
		tematica: $('#tematica').val(),
		nivelEducativo: $('#nivel-educativo').val(),
		titulo: $('#titulo').val()
	};

	var otra = $('#otra-tematica').val();
	if (propuesta.tematica == 24){
		propuesta['otra-tematica'] = otra;
	} 

	var isValid = validarPropuesta(propuesta);
	console.log(propuesta);
}

$('#enviar-datos-propuesta').click(enviarPropuesta);