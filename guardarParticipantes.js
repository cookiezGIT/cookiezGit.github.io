function buscarPartClick(){
	var button = $(this);
	var num = button.data('num');
	var minus = "";
	if (num !== "")
		minus = "-"

	var fullForm = $('#form-participantes'.concat(minus, num));
	var tipo = fullForm.find('input[name="search-group1"]:checked').val();

	var numDoc = $('#search-docnum'.concat(minus, num)).val();

	if (tipo === undefined || numDoc === "") {
		showErrorMessage('Debe completar los datos para poder realizar la busqueda.');
	}

	var object = {
		tipo: tipo,
		num: numDoc
	}

	console.log(object);

	/*jQuery(function($) {
        $.ajax({
            type: 'POST',
            url: 'WS/ListarModalidad.php',
            success: function(data) {

            }
        });
    });*/
    fullForm.find('.search').remove();
    fullForm.find('.main-form').removeClass('hide');

}


function guardarParticipantes(){
	var participantes = [];
	var i = 0;
	var id = 'form-participantes';
	var partForm = $('#'.concat(id));
	do{		
		var participante = {};

		$.each(partForm.find('input, select'), function(i, val){
			var elem = $(val);
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
			}
		});

		participantes.push(participante);

		partForm = $('#'.concat(id, '-', i));
		i++;
	}while(partForm.length > 0);

	console.log(participantes);
}

$('#guardar-participantes').click(guardarParticipantes);

$('.form-part').find('.buscar-part').click(buscarPartClick);