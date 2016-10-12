var ruta = "data/pacientes.json";

//campos
var cdni=$('#dnicheck');
var cnombre=$('#nombre');
var cedad=$('#edad');
var cgenM=$('#genM');
var cgenF=$('#genF');
var cdesc=$('#desc');
var cdoctor=$('#doctor');
var cesp=$('#esp');
var ctrat=$('#trat');
var ck1=$('#k1');
var ck2=$('#k2');
var ck3=$('#k3');
var clegal=$('#legal');


//cargar la tabla
function llenar(){

    load(function(response) {

        var res =JSON.parse(localStorage.getItem('pacientes'));
        console.log(res[0].nombrepaciente);
        for(i=0;i<res.length;i++){
            var d1= res[i]['fecha de ingreso'].split('/');
            var d1 = new Date(d1[2],d1[1],d1[0]);
            var d2 = new Date();
            var d = Math.ceil((d2.getTime()-d1.getTime())/(1000*60*60*24));
            var child = '<div class="tbody tr">\
            <div class="td">'+res[i].nombrepaciente+'</div>\
        <div class="td">'+res[i].edad+'</div>\
        <div class="td"><strong>'+res[i].urgtratC2+'</strong></div>\
            <div class="td">'+d+'</div>\
            <div class="td" style="font-size:12pt;">'+res[i].descripcion+'</div>\
        <div class="td">\
            <button class="sub2" onclick="editarPaciente('+res[i].dni+')" >Editar</button>\
            <button class="sub2" onclick="asignarPaciente('+res[i].dni+')">Asignar</button>\
            </div>\
            </div>';
            table.append(child);
        }
        $rows = $('.tbody');
    })
}

function dni(){
    var res =JSON.parse(localStorage.getItem('pacientes'));
        console.log(res)
        for(i=0; i<res.length; i++){
            if($('#dnicheck').val()==res[i].dni) {

                 cnombre.val(res[i].nombrepaciente);
                 cedad.val(res[i].edad);
            }
    }

    $('#dniform').toggleClass('hide');
    $('#allform').toggleClass('hide');
}

function save(){
    var res =JSON.parse(localStorage.getItem('pacientes'));
    if(cgenF.prop("checked", true)){
        var gen="F";
    }else{
        var gen="M";
    }
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd
    }
    if(mm<10){
        mm='0'+mm
    }
    var today = dd+'/'+mm+'/'+yyyy;
    var obj={
        "dni": cdni.val(),
        "nombrepaciente": cnombre.val(),
        "doctor": cdoctor.val(),
        "edad": cedad.val(),
        "genero": gen,
        "descripcion": cdesc.val(),
        "especialidad": cesp.val(),
        "fecha de ingreso": today,
        "estabilidadCI": ck2.val(),
        "diasrestC1": ck3.val(),
        "tipotrat": ctrat.val(),
        "urgtratC2": ck1.val(),
        "SocLegC3": clegal.val()
    }
    console.log(obj);
    res.push(obj);
    console.log(res);
    localStorage.setItem('pacientes',JSON.stringify(res));
    window.location.href="em.html";
}

