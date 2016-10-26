function RegistrarArchivo() {
    frames.ifr.document.getElementById('hdlId_Registro').value = idPropuesta;
    frames.ifr.document.getElementById('hdlFl_Tipo').value = "1";
    frames.ifr.document.getElementById('btnValidar').click();

    return;
}


function Respuesta(Res, Men) {
	if (Res == 1) {
	    $('#contenedor').addClass('hide');
    	$('#exito').removeClass('hide');
	}
	else{
    	showErrorMessage(Men, '#archivos-notificaciones');		
	}

    return;
}

$('#finalizar').click(RegistrarArchivo);