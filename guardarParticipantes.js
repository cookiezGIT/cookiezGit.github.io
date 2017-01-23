'use strict';

var participantes;

function buscarPartClick(){
	var button = $(this);
	var num = button.data('num');
	var minus = "";
	if (num !== "")
		minus = "-"

	var particForm = $('#form-participantes'.concat(minus, num));
	var tipo = particForm.find('input[name="search-group1'.concat(minus, num, '"]:checked')).val();

	var numDoc = $('#search-docnum'.concat(minus, num)).val();

	if (tipo === undefined || numDoc === "") {
		showErrorMessage('Debe completar los datos para poder realizar la búsqueda.');
		return;
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
		$('#form-participantes'.concat(formSuffix)).data('id-participante', participante.ID_PARTICIPANTE);
		$('#nombre'.concat(formSuffix)).val(participante.NO_NOMBRE);
		$('#paterno'.concat(formSuffix)).val(participante.NO_APELLIDO_PATERNO);
		$('#materno'.concat(formSuffix)).val(participante.NO_APELLIDO_MATERNO);
		$('#docnum'.concat(formSuffix)).val(participante.NU_DOCUMENTO);
		$('#institucion'.concat(formSuffix)).val(participante.NO_INSTITUCION);
		$('#email'.concat(formSuffix)).val(participante.NO_EMAIL);
		$('#telefono'.concat(formSuffix)).val(participante.NU_TELEFONO);

		$('#row-confirmar-correo'.concat(formSuffix)).remove();

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
	$('#form-participantes'.concat(formSuffix)).data('id-participante', 0);
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
				showErrorMessage(elem.data('errmsg').concat(numeroParticipante + 1, '.'));
				return false;
			}
			else if (type == 'radio' && elem.is(':checked')) {
				isRadioSelected = true;
			}
		}
	}

	if (isRadioSelected === false) {
		showErrorMessage('Ingrese el tipo de documento para el participante '.concat(numeroParticipante + 1, '.'));
		return false;
	}

	return true;
}

function guardarParticipantes(){
	participantes = [];
	var i = 0;
	var id = 'form-participantes';
	var partForm = $('#'.concat(id));
	var button = $(this);
	var allInputs = [];

	do{
		var inputs = partForm.find('input, select');

		if (!validarParticipante(inputs, i))
			return;

		partForm = $('#'.concat(id, '-', i));
		i++;
	}while(partForm.length > 0);

	i = 0;
	partForm = $('#'.concat(id));
	do{
		var participante = {};

		var inputs = partForm.find('input, select');

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

				allInputs.push(elem);
			}
		}

		participante['id-propuesta'] = idPropuesta;
		participante['id-participante'] = partForm.data('id-participante');

		participantes.push(participante);

    	partForm = $('#'.concat(id, '-', i));
		i++;
	}while(partForm.length > 0);

	//console.log(participantes);

	enviarParticipantes(participantes, allInputs);
}

function disableInputs(inputs){
	for (var i = 0; i < inputs.length; i++) {
		inputs[i].attr('disabled', true);
		if (inputs[i].get(0).tagName == 'SELECT')
			inputs[i].material_select();
	}
}

function onResults(results, allInputs){
	//console.log(results);
	for (var prop in results){
		if (results.hasOwnProperty(prop)) {
			if (results[prop].RPTA == 0) {
				showErrorMessage('Registro '.concat(parseInt(prop) + 1, ': ', results[prop].MENS));
				return;
			}				
		}
	}
	disableInputs(allInputs);
	$('#guardar-participantes').remove();
	$('#paso3').removeClass('hide');
	$("html, body").animate({ scrollTop: $(document).height() }, 1000);

	var select = $('#participantes');
	select.attr('disabled', true);
	select.material_select();

}

function ajaxForPart(participante, results, i){
	var j = i;
	return $.ajax({
        type: 'POST',
        url: 'WS/RegistrarParticipante.php',
        dataType: 'text',
        data: participante,
        success: function(data) {
        	results[j] = JSON.parse(data);
    	}
	});
}

function enviarParticipantes(participantes, allInputs){
	var ajaxArray = [];
	var results = {};

	for (var i = 0; i < participantes.length; i++) {
		var async = ajaxForPart(participantes[i], results, i);
		ajaxArray.push(async);
	}

	$.when.apply(undefined, ajaxArray).done(function(){
		onResults(results, allInputs);
	});
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

function enviarConfirmacion(){
	var button = $(this);
	var num = button.data('num');
	var minus = "";
	if (num !== "")
		minus = "-"

	if (validateEmail($('#email'.concat(minus, num)).val())) {
		$('#div-codigo-confirmacion'.concat(minus, num)).removeClass('hide');
		button.addClass('hide');
	}
	else{
		showErrorMessage('Debe ingresar un email válido.');
	}
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

$('#search-docnum').keydown(function(e) {
    if(e.which == 13) {
        $('#form-participantes').find('.buscar-part').click();
    }
 });

$('#guardar-participantes').click(guardarParticipantes);

$('.form-part').find('.buscar-part').click(buscarPartClick);
$('.form-part').find('.confirmar-correo').click(enviarConfirmacion);
