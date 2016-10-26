function RegistrarArchivo() {
    frames.ifr.document.getElementById('hdlId_Registro').value = '108';
    frames.ifr.document.getElementById('hdlFl_Tipo').value = "1";
    frames.ifr.document.getElementById('btnValidar').click();
    return;
}


function Respuesta(Res, Men) {
    showErrorMessage(Men, '#archivos-notificaciones');
    return;
}

$('#finalizar').click(RegistrarArchivo);