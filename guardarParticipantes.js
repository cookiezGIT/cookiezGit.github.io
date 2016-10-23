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

$('.form-part').find('.buscar-part').click(buscarPartClick);