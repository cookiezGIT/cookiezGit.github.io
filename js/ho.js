/**
 * Created by Renzo on 29/09/2016.
 */
var ruta = "data/camas.json";
var table = $('.table-fill');
llenar();
var cnum = $('#num');
var cesp = $('#esp');

function load(callback){
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', ruta, true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    }
    xobj.send(null);

}

//cargar la tabla
function llenar(){
    if(localStorage.getItem('camas')!= null){
        var res =JSON.parse(localStorage.getItem('camas'));
        for(i=0;i<res.length;i++) {
            if (res[i].status == "d") {
                var child = '<div class="tbody tr">\
                <div class="td"><strong>' + res[i].num + '</strong></div>\
                <div class="td"><strong>' + res[i].esp + '</strong></div>\
                </div>';
                table.append(child);
            }
        }
    }else {
        load(function (response) {
            resp = JSON.parse(response);
            localStorage.setItem('camas', JSON.stringify(resp));
            var res = resp;
            console.log(res)
            for(i=0;i<res.length;i++) {
                if (res[i].status == "d") {
                    var child = '<div class="tbody tr">\
                <div class="td"><strong>' + res[i].num + '</strong></div>\
                <div class="td"><strong>' + res[i].esp + '</strong></div>\
                </div>';
                    table.append(child);
                }
            }
        });
    }

}
//Funciones de rutas

function save(){
    var res =JSON.parse(localStorage.getItem('camas'));
    var obj={
        "num": cnum.val(),
        "esp": cesp.val(),
        "status": "d"
    }
    var child = '<div class="tbody tr">\
            <div class="td"><strong>'+obj.num+'</strong></div>\
            <div class="td"><strong>'+obj.esp+'</strong></div>\
            </div>';
    table.append(child);
    console.log(obj);
    res.push(obj);
    console.log(res);
    localStorage.setItem('camas',JSON.stringify(res));
    cnum.val('');
    cesp.val('');

}

$('input[type=text]').on('keydown', function(e) {
    if (e.which == 13) {
        save();
    }
});