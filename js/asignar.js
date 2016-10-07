/**
 * Created by Renzo on 29/09/2016.
 */
if(localStorage.getItem('dni')==null){
    window.location.href="em.html";
}
var ruta = "data/camas.json";
var ruta2= "data/pacientes.json";
var table = $('.table-fill');
llenar();


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
                <div class="td"><button class="sub2" onclick="asignar('+res[i].num+')" >Asignar</button></div>\
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
                <div class="td"><button class="sub2" onclick="asignar('+res[i].num+')" >Asignar</button></div>\
                </div>';
                    table.append(child);
                }
            }
        });
    }

}

function asignar(num){
    var res =JSON.parse(localStorage.getItem('camas'));
    var pac =JSON.parse(localStorage.getItem('pacientes'));
    var obj=[];
    for(i=0;i<res.length;i++) {
        if(res[i].num==num){
            console.log('se desasignó')
        }else{
            obj.push(res[i]);
        }
    }
    localStorage.setItem('camas', JSON.stringify(obj));
    var obj=[];
    for(i=0;i<pac.length;i++) {
        if(pac[i].dni==localStorage.getItem('dni')){
            console.log('se encontró el dni')
        }else{
            obj.push(pac[i]);
        }
    }
    localStorage.setItem('pacientes',JSON.stringify(obj));
    localStorage.removeItem('dni');
    window.location.href = "em.html";
}

function volver(){
    localStorage.removeItem('dni');
    window.location.href = "em.html";
}