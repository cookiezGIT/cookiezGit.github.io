var participantes;

function buscarPartClick(){
	var button = $(this);
	var num = button.data('num');
	var minus = "";
	if (num !== "")
		minus = "-"

	var particForm = $('#form-participantes'.concat(minus, num));
	var tipo = particForm.find('input[name="search-group1"]:checked').val();

	var numDoc = $('#search-docnum'.concat(minus, num)).val();

	if (tipo === undefined || numDoc === "") {
		showErrorMessage('Debe completar los datos para poder realizar la busqueda.');
	}

	var busqueda = {
		'tipo-doc': tipo,
		'numero-documento': numDoc
	};
	//console.log(busqueda);

	jQuery(function($) {
        $.ajax({
            type: 'POST',
            url: 'WS/FiltrarParticipanteDocumento.php',
            dataType: 'text',
            data: busqueda,
            success: function(data) {
            		try{
                   		JSON.parse(data);
                   		var pre = JSON.parse(data);
                   		//console.log(pre);
                   		colocarDatosParticipante(pre, minus.concat(num));
                    } catch(err) {
											colocarDocID(busqueda, minus.concat(num));
                    }

            }
        });
    });
    particForm.find('.search').remove();
    particForm.find('.main-form').removeClass('hide');

    mostrarBotonGuardarParticipantes();
}

function colocarDatosParticipante(participante, formSuffix){
	if (participante !== undefined) {
		$('#nombre'.concat(formSuffix)).val(participante.NO_NOMBRE);
		$('#paterno'.concat(formSuffix)).val(participante.NO_APELLIDO_PATERNO);
		$('#materno'.concat(formSuffix)).val(participante.NO_APELLIDO_MATERNO);
		$('#docnum'.concat(formSuffix)).val(participante.NU_DOCUMENTO);
		$('#institucion'.concat(formSuffix)).val(participante.NO_INSTITUCION);
		$('#email'.concat(formSuffix)).val(participante.NO_EMAIL);
		$('#telefono'.concat(formSuffix)).val(participante.NU_TELEFONO);

		var select = $('#pais'.concat(formSuffix));
		select.val(participante.ID_PAIS);
		select.material_select();

		var radioGroup = $('#form-participantes'.concat(formSuffix, ' ', 'input:radio[name="tipo-doc"]'));
		$.each(radioGroup, function(i, val){
			var radio = $(val);
			if (radio.val() == participante.ID_TIPO_DOCUMENTO)
				radio.attr('checked', 'checked');
		});

		Materialize.updateTextFields();
	}
}

function colocarDocID(busqueda, formSuffix){
	var radioGroup = $('#form-participantes'.concat(formSuffix, ' ', 'input:radio[name="tipo-doc"]'));
	$.each(radioGroup, function(i, val){
		var radio = $(val);
		if (radio.val() == busqueda['tipo-doc'])
			radio.attr('checked', 'checked');
	});
	$('#docnum'.concat(formSuffix)).val(busqueda['numero-documento']);
	Materialize.updateTextFields();
}


function validarParticipante(inputs, numeroParticipante){
	var isRadioSelected = false;

	for (var j = 0; j < inputs.length; j++) {
		var elem = $(inputs.get(j));
		var name = elem.attr('name');
		var value = elem.val();
		var type = elem.attr('type');

		if (name !== undefined) {
			if (value === "" || value === undefined || value === null) {
				showErrorMessage('El participante '.concat(numeroParticipante + 1, ' requiere ', name, '.'));
				return false;
			}
			else if (type == 'radio' && elem.is(':checked')) {
				isRadioSelected = true;
			}
		}
	}

	if (isRadioSelected === false) {
		showErrorMessage('El participante '.concat(numeroParticipante + 1, ' requiere su tipo de documento.'));
		return false;
	}

	return true;
}

function guardarParticipantes(){
	participantes = [];
	var i = 0;
	var id = 'form-participantes';
	var partForm = $('#'.concat(id));
	do{
		var participante = {};

		var inputs = partForm.find('input, select');

		if (!validarParticipante(inputs, i))
			return;

		for (var j = 0; j < inputs.length; j++) {
			var elem = $(inputs.get(j));
			var name = elem.attr('name');
			var value = elem.val();
			var type = elem.attr('type');

			if (name !== undefined) {
				if (type == 'checkbox') {

					if (elem.is(':checked')) {
						participante[name] = value;
						if (i === 0) {
							participante[name] = '1|'.concat(value);
						}
					}
					else{
						participante[name] = '0';
						if (i === 0) {
							participante[name] = '1';
						}
					}

				}
				else if(type == 'radio' && elem.is(':checked')){
					participante[name] = value;
				}
				else if(type != 'radio'){
					participante[name] = value;
				}

				elem.attr('disabled', true);
				if (inputs.get(j).tagName == 'SELECT')
					elem.material_select();
			}
		}

		participante['id-propuesta'] = idPropuesta;

		participantes.push(participante);

		jQuery(function($) {
	        $.ajax({
	            type: 'POST',
	            url: 'WS/RegistrarParticipante.php',
	            dataType: 'text',
	            data: participante,
	            success: function(data) {
	            	//console.log(data);
            	}
        });

		partForm = $('#'.concat(id, '-', i));
		i++;
    });
	}while(partForm.length > 0);

	//$(this).remove();
	$('#paso3').removeClass('hide');
	$("html, body").animate({ scrollTop: $(document).height() }, 1000);

	var select = $('#participantes');
	select.attr('disabled', true);
	select.material_select();

	//console.log(participantes);
}

function mostrarBotonGuardarParticipantes(){
	var cantSearchBoxes = $('.search').length;
    if(cantSearchBoxes === 0){
    	$('#guardar-participantes').removeClass('hide');
    }
    else{
    	$('#guardar-participantes').addClass('hide');
    }
}

$('#search-docnum').keydown(function(e) {
    if(e.which == 13) {
        $('#form-participantes').find('.buscar-part').click();
    }
 });

$('#guardar-participantes').click(guardarParticipantes);

$('.form-part').find('.buscar-part').click(buscarPartClick);
