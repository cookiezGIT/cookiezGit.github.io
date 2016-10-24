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

	var object = {
		tipo: tipo,
		num: numDoc
	}

	jQuery(function($) {
        $.ajax({
            type: 'GET',
            url: 'https://demo1779969.mockable.io/participante',
            success: function(data) {
            	colocarDatosParticipante(data, minus.concat(num));
            }
        });
    });
    particForm.find('.search').remove();
    particForm.find('.main-form').removeClass('hide');

    mostrarBotonGuardarParticipantes();
}

function colocarDatosParticipante(participante, formSuffix){
	if (participante !== undefined) {
		$('#nombre'.concat(formSuffix)).val(participante.nombre);
		$('#paterno'.concat(formSuffix)).val(participante['apellido-paterno']);
		$('#materno'.concat(formSuffix)).val(participante['apellido-materno']);
		$('#docnum'.concat(formSuffix)).val(participante['num-documento']);
		$('#institucion'.concat(formSuffix)).val(participante.institucion);
		$('#email'.concat(formSuffix)).val(participante.email);
		$('#telefono'.concat(formSuffix)).val(participante.telefono);

		$('#expositor'.concat(formSuffix)).attr('checked', participante.expositor);
		$('#coordinador'.concat(formSuffix)).attr('checked', participante.coordinador);

		var select = $('#pais'.concat(formSuffix));
		select.val(participante.pais);
		select.material_select();

		var radioGroup = $('#form-participantes'.concat(formSuffix, ' ', 'input:radio[name="tipo-doc"]'));
		$.each(radioGroup, function(i, val){
			var radio = $(val);
			if (radio.val() == participante.documento)
				radio.attr('checked', 'checked');
		});

		Materialize.updateTextFields();
	}
}

function validarParticipante(inputs, numeroParticipante){
	var isRadioSelected = false;
	var isCheckboxSelected = false;

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
			else if(type == 'checkbox' && elem.is(':checked')){
				isCheckboxSelected = true;
			}
		}
	}

	if (isRadioSelected === false) {
		showErrorMessage('El participante '.concat(numeroParticipante + 1, ' requiere su tipo de documento.'));
		return false;
	}

	if (isCheckboxSelected === false) {
		showErrorMessage('El participante '.concat(numeroParticipante + 1, ' requiere un tipo de persona.'));
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
					participante[name] = elem.is(':checked');
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

		participantes.push(participante);

		partForm = $('#'.concat(id, '-', i));
		i++;

		jQuery(function($) {
	        $.ajax({
	            type: 'POST',
	            url: 'WS/RegistrarParticipante.php',
	            dataType: 'text',
	            data: participante,
	            success: function(data) {
	            	console.log(data);
            	}
        });
    });
	}while(partForm.length > 0);

	//$(this).remove();

	console.log(participantes);
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

$('#guardar-participantes').click(guardarParticipantes);

$('.form-part').find('.buscar-part').click(buscarPartClick);
