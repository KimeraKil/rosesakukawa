$(document).ready(function(){
    $.ajax({
        url:"rose.php",
        type: "POST",
        data:{
            acao: 'newLoad', sltX: 1
        },
        success:(result)=>{
        
        }}
    )    
})

function chk(act, slt){
    $.ajax({
        url:"rose.php",
        type: "POST",
        data:{
            acao: act, sltX: slt
        },
        success:(result)=>{
            eVerificado = JSON.parse(result);
        }}
    )
}

$('#sltKg').blur(function(){
    var sltKilos = $('#sltKg').val()
    $.ajax({
        url:"rose.php",
        type: "POST",
        data:{
            acao: 'kilos', sltX: sltKilos
        },
        success:(result)=>{
            eVerificado = JSON.parse(result);
        }}
    )    

    $.ajax({
        url:"rose.php",
        type: "POST",
        data:{
            acao: 'total', sltX: 1
        },
        success:(result)=>{
            eVerificado = JSON.parse(result);
            verificarChk(1)
            verificarChk(2)
            $('#pKG').text(sltKilos+' Kg')
            $('#totalO').text('R$ '+eVerificado)
        }}
    )     
});

$('#sltRech').on('change', function(){    
    var sltRecheio = $('#sltRech').val()
    var nameSlt = $('#sltRech :selected').text()
    $.ajax({
        url:"rose.php",
        type: "POST",
        data:{
            acao: 'recheio', sltX: sltRecheio
        },
        success:(result)=>{
            eVerificado = JSON.parse(result);
        }}
    )

    $.ajax({
        url:"rose.php",
        type: "POST",
        data:{
            acao: 'total', sltX: 1
        },
        success:(result)=>{
            eVerificado = JSON.parse(result);
            $('#pKG').text($('#sltKg').val()+' Kg')
            $('#pRec').text(nameSlt)
            $('#totalO').text('R$ '+eVerificado)
        }}
    )
    if($('#sltRech').val() == 2){                
        $('#Ex2').prop('disabled', true);
        $('#Ex2').prop('checked', false);
        verificarChk(1)
        verificarChk(2)
    } else if($('#sltMassa').val() != 0 && $('#sltCob').val() != 0){
        $('#Ex2').prop('disabled', false);
    }
})

$('#sltCob').on('change', function(){
    var sltCob = $('#sltCob').val()
    var nameSlt = $('#sltCob :selected').text()
    $.ajax({
        url:"rose.php",
        type: "POST",
        data:{
            acao: 'cobertura', sltX: sltCob
        },
        success:(result)=>{
            eVerificado = JSON.parse(result);
        }}
    )

    $.ajax({
        url:"rose.php",
        type: "POST",
        data:{
            acao: 'total', sltX: 1
        },
        success:(result)=>{
            eVerificado = JSON.parse(result);
            $('#pCob').text(nameSlt)
            $('#totalO').text('R$ '+eVerificado)
        }}
    )      
})

$('#sltMassa').on('change', function(){
    var sltMass = $('#sltMassa').val()
    var nameSlt = $('#sltMassa :selected').text()
    $.ajax({
        url:"rose.php",
        type: "POST",
        data:{
            acao: 'massa', sltX: sltMass
        },
        success:(result)=>{
            eVerificado = JSON.parse(result);
        }}
    )

    $.ajax({
        url:"rose.php",
        type: "POST",
        data:{
            acao: 'total', sltX: 1
        },
        success:(result)=>{
            eVerificado = JSON.parse(result);
            $('#pMass').text(nameSlt)
            $('#totalO').text('R$ '+eVerificado)
            $('#Ex1').prop('disabled', false);
            if($('#sltRech').val() == 2){

                $('#Ex2').prop('disabled', true);
            } else {
                $('#Ex2').prop('disabled', false);
            }            
            $('#Ex3').prop('disabled', false);
            $('#Ex4').prop('disabled', false);
            $('#Ex5').prop('disabled', false);
        }}
    )    
})

$('#Ex1').on('click', function(){
    verificarChk(1)
})

$('#Ex2').on('click', function(){
    verificarChk(2)
})

$('#Ex3').on('click', function(){
    verificarChk(3)
})

$('#Ex4').on('click', function(){
    verificarChk(4)
})

$('#Ex5').on('click', function(){
    verificarChk(5)
})

function verificarChk(act){
    if(act == 1){
        if($('#Ex1').prop('checked') == false){
            $('#pEx1').text('')
            chksExtras(0, 'glitter');            
        } else {
            if($('#sltKg').val() <= 3){
                chksExtras(1, 'glitter');
                $('#pEx1').text("Glitter")
            } else if ($('#sltKg').val() > 3){
                chksExtras(2, 'glitter');
                $('#pEx1').text("Glitter")
            } else {
                chksExtras(0, 'glitter');
            }
        }
    } else if(act == 2){
        if($('#Ex2').prop('checked') == false){ 
            $('#pEx2').text('')
            chksExtras(0, 'raspas');
            $('#sinB').addClass('some') 
        } else {
            if($('#sltKg').val() <= 3){
                $('#pEx2').text('1')
                chksExtras(1, 'raspas'); 
                $('#pEx2').text('Raspas de Chocolate')
                $('#sinB').addClass('some') 
            } else if($('#sltKg').val() > 3){
                $('#pEx2').text('2')
                chksExtras(2, 'raspas');
                $('#pEx2').text('Raspas de Chocolate')
                $('#sinB').removeClass('some') 
            }
        }
    } else if(act == 3){
        if($('#Ex3').prop('checked') == false){
            $('#pEx3').text('')
            chksExtras(0, 'topper');  
        } else {
            chksExtras(1, 'topper');
            $('#pEx3').text("Topper")
        }
    } else if(act == 4){
        if($('#Ex4').prop('checked') == false){
            $('#pEx4').text('')
            chksExtras(0, 'floresP');  
        } else {
            chksExtras(1, 'floresP');
            $('#pEx4').text("Flores Permanentes")
        }
    } else if(act == 5){
        if($('#Ex5').prop('checked') == false){
            $('#pEx5').text('')
            chksExtras(0, 'floresA');  
        } else {
            chksExtras(1, 'floresA');
            $('#pEx5').text("Flor de Açucar")
        }
    }
}

function chksExtras(act, val){
    $.ajax({
        url:"rose.php",
        type: "POST",
        data:{
            acao: val, sltX: act
        },
        success:(result)=>{
            eVerificado = JSON.parse(result);
            if(val == 'glitter'){
                if(eVerificado == 'Valor a consultar.'){
                    $('#pEx1p').text(eVerificado)                    
                } else if(eVerificado == '0'){
                    $('#pEx1p').text('') 
                } else {
                    $('#pEx1p').text('R$ '+eVerificado) 
                }
                
            } else if(val == 'raspas'){
                if(eVerificado == 'Valor a consultar.'){
                    $('#pEx2p').text(eVerificado)              
                } else if(eVerificado == '0'){
                    $('#pEx2p').text('')  
                } else {
                    $('#pEx2p').text('R$ '+eVerificado)  
                }                            
            }
        }}
    )

    $.ajax({
        url:"rose.php",
        type: "POST",
        data:{
            acao: 'total', sltX: 1
        },
        success:(result)=>{
            eVerificado = JSON.parse(result);
            $('#totalO').text('R$ '+eVerificado)
        }}
    )    
}

$('#btnSend').on('click', function() {
    var confKG = $('#pKG').text()
    var confR = $('#pRec').text()
    var confC = $('#pCob').text()
    var confM = $('#pMass').text() 
    var conTot = $('#totalO').text()
    var extrs
    var celNum
    var texto
    var conEX1
    var conEX2
    var conEX3
    var conEX4
    var conEX5
    var tx = []
    
    if(validarCamp() == false){
        alert('Campos: Bolo, Recheio, Cobertura e Massa, são Obrigatórios')
    } else {
        if($('#pEx1').text() != ''){
            conEX1 = $('#pEx1').text()
            tx.push(conEX1)
        } else {
            conEX1 = 0
        }

        if($('#pEx2').text() != ''){
            conEX2 = $('#pEx2').text()
            tx.push(conEX2)
        } else {
            conEX2 = 0
        }

        if($('#pEx3').text() != ''){
            conEX3 = $('#pEx3').text()
            tx.push(conEX3)
        } else {
            conEX3 = 0
        }

        if($('#pEx4').text() != ''){
            conEX4 = $('#pEx4').text()
            tx.push(conEX4)
        } else {
            conEX4 = 0
        }

        if($('#pEx5').text() != ''){
            conEX5 = $('#pEx5').text()
            tx.push(conEX5)
        } else {
            conEX5 = 0
        }

        extrs = tx.join(", ")

        $.ajax({
            url:"rose.php",
            type: "POST",
            data:{
                acao: 't405', sltX: 1, a:conEX1, b:conEX2, c:conEX3, d:conEX4, e: conEX5
            },
            success:(result)=>{
                eVerificado = JSON.parse(result);
                //extrs = eVerificado['extras'].join("/ ")
                celNum = eVerificado['numero']  
                texto = encodeURIComponent(
                    `\u{2705} *Nova Solicitação*
Bolo: *${confKG}*
Recheio de: *${confR}*
Cobertura: *${confC}*
Massa de: *${confM}*
Extra: *${extrs}*
Total: R$ *${conTot}*
`);        
                var link = 'https://wa.me/'+celNum+'?text='+texto; 
                 window.open(link)
            }}
        )
           
    }
});

function validarCamp(){
    var ky = false;
    for(i = 0; i < 5; i++){
        if($('#sltKg').val() == 0 || $('#sltKg').val() == null){
            ky = false
        } else {
            ky = true
        }

        if($('#sltRech').val() == 0){
            ky = false
        } else {
            ky = true
        }

        if($('#sltCob').val() == 0 ){
            ky = false
        } else {
            ky = true
        }

        if($('#sltMassa').val() == 0 ){
            ky = false
        } else {
            ky = true
        }
    }
    return ky

}