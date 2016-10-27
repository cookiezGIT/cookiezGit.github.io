var idPropuesta = 0;

function validarPropuesta(propuesta, ids){
	for (var prop in propuesta){
		if( propuesta.hasOwnProperty( prop ) ) {
			if (propuesta[prop] === null || propuesta[prop] === undefined || propuesta[prop] == '') {
				showErrorMessage($(ids[prop]).data('errmsg'), '#datos-notificaciones');
				return false;
			}
		}
	}
	return true;
}

function enviarPropuesta(){
	var button = $(this);

	var propIds = {
		modalidad: '#modalidades',
		tematica: '#tematica',
		nivelEducativo: '#nivel-educativo',
		titulo: '#titulo'
	};

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

	var isValid = validarPropuesta(propuesta, propIds);
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
					//console.log(data);
					//deshabilitar selects y titulo
					$('#modalidades').attr('disabled','disabled');
					$('#modalidades').material_select();
					$('#tematica').attr('disabled','disabled');
					$('#tematica').material_select();
					$('#nivel-educativo').attr('disabled','disabled');
					$('#nivel-educativo').material_select();
					$('#titulo').attr('disabled','disabled');
					cargarPlantillas();
				}
        	});
	    });
	}
	//console.log(propuesta);
}

$('#enviar-datos-propuesta').click(enviarPropuesta);
