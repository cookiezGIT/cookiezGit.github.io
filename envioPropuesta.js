var idPropuesta = 0;

function validarPropuesta(propuesta){
	for (var prop in propuesta){
		if( propuesta.hasOwnProperty( prop ) ) {
			if (propuesta[prop] === null || propuesta[prop] === undefined || propuesta[prop] == '') {
				showErrorMessage('Debe ingresar un(a) '.concat(prop, '.'), '#datos-notificaciones');		
				return false;	
			}
		} 
	}
	return true;
}

function enviarPropuesta(){
	var button = $(this);
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
	propuesta['otra-tematica'] = '';

	if (isValid) {
		jQuery(function($) {
	        $.ajax({
				type: 'POST',
				url: 'WS/RegistrarPropuesta.php',
				dataType: 'text',
				data: propuesta,
				success: function(data) {
					var res = JSON.parse(data);
					idPropuesta = res.RPTA;

					var paso2 = $('#paso2');
					paso2.removeClass('hide');
					button.remove();
					$('html, body').animate({
				        scrollTop: paso2.offset().top
				    }, 1000);
					console.log(data);
				}
        	});
	    });
	}
	console.log(propuesta);
}

$('#enviar-datos-propuesta').click(enviarPropuesta);