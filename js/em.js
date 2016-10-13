/**
 * Created by Renzo on 29/09/2016.
 */
var ruta = "data/pacientes.json";
var table = $('.table-fill');
var $rows = $('.tbody');
llenar();
localStorage.removeItem('dni');
autoInc();

function load(callback){
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', ruta, true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
            console.log(xobj.responseText);
        }
    }
    xobj.send(null);

}

//cargar la tabla
function llenar(){
    if(localStorage.getItem('pacientes')!= null){
        var res =JSON.parse(localStorage.getItem('pacientes'));

        for(i=0;i<res.length;i++){
            var d1= res[i]['fecha de ingreso'].split('/');
            var d1 = new Date(d1[2],d1[1]-1,d1[0]);
            var d2 = new Date();
            var d = Math.ceil((d2.getTime()-d1.getTime())/(1000*60*60*24));
            var child = '<div class="tbody tr">\
            <div class="td">'+res[i].nombrepaciente+'</div>\
        <div class="td">'+res[i].edad+'</div>\
        <div class="td"><strong>'+res[i].estabilidadCI+'</strong></div>\
            <div class="td">'+d+'</div>\
            <div class="td" style="font-size:12pt;">'+res[i].descripcion+'</div>\
        <div class="td">\
            <button class="sub2" onclick="asignarPaciente('+res[i].dni+')">Asignar</button>\
            </div>\
            </div>';
            table.append(child);
            $rows = $('.tbody');
        }
    }else {
        load(function (response) {
            resp = JSON.parse(response);
            localStorage.setItem('pacientes', JSON.stringify(resp));
            var res=resp;

            for(i=0;i<res.length;i++){
                var d1= res[i]['fecha de ingreso'].split('/');
                var d1 = new Date(d1[2],d1[1]-1,d1[0]);
                var d2 = new Date();
                var d = Math.ceil((d2.getTime()-d1.getTime())/(1000*60*60*24));
                var child = '<div class="tbody tr">\
            <div class="td">'+res[i].nombrepaciente+'</div>\
        <div class="td">'+res[i].edad+'</div>\
        <div class="td"><strong>'+res[i].urgtratC2+'</strong></div>\
            <div class="td">'+d+'</div>\
            <div class="td" style="font-size:12pt;">'+res[i].descripcion+'</div>\
        <div class="td">\
            <button class="sub2" onclick="asignarPaciente('+res[i].dni+')">Asignar</button>\
            </div>\
            </div>';
                table.append(child);
                $rows = $('.tbody');
            }
        });
    }
}

function compare(a,b){
    if(a.estabilidadCI < b.estabilidadCI)
        return 1;
    if(a.estabilidadCI > b.estabilidadCI)
        return -1;
    return 0;
}

//Refresh de las prioridades
function autoInc(){
    setInterval(function(){
        var res =JSON.parse(localStorage.getItem('pacientes'));
        $('.tbody').remove();
        for(i=0;i<res.length;i++){
            var inc = 0;
            inc = inc + (res[i].diasrestC1*0.5) + (res[i].urgtratC2*0.4) + (res[i].SocLegC3*0.1);
            res[i].estabilidadCI += inc;
            res[i].estabilidadCI = Math.round(res[i].estabilidadCI);
            console.log(res[i].estabilidadCI);
            res.sort(compare);
        }
        localStorage.setItem('pacientes',JSON.stringify(res));
        llenar();
    },6000)

}

//Funciones de rutas
function setPaciente(dni){
    localStorage.setItem('dni',dni);
}

function asignarPaciente(dni){
    setPaciente(dni);
    window.location.href = 'asignar.html';
}

//search
$('#search').keyup(function() {
    var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();

    $rows.show().filter(function() {
        var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
        return !~text.indexOf(val);
    }).hide();
});
