$(document).ready(function () {
    fnListarRespuestas(parseInt($("#idPregunta").val()));

    $("#btnGuardarRespuesta").on("click", function () {
        fnAgregarRespuestas();
    });


});


function fnListarRespuestas(idPregunta) {
    var baseUrl = $("#hdnBaseUrl").val();
    var url = $("#hdnUrlUs").val();

    if (idPregunta > 0) {
        $.ajax({
            url: baseUrl + "ForoBACApi/RespuestaxUsuario?idPregunta=" + idPregunta,
            type: "POST",
            data: {
                idPregunta: idPregunta
            },
            success: function (data) {
                var oTable = $("#tblRespuesta").DataTable();
                oTable.clear();

                for (var i = 0; i < data.length; i++) {
                    var s = '';
                    var button = '<div class="btn-group">' +
                        '<button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Acciones</button>';
                    button += '<div class="dropdown-menu">';
                    button += '<a class="dropdown-item hand ResponderPregunta"><i class="fas fa-question mr-2"></i> Responder</a>';
                    s += '<tr>';
                    s += '<td>' + data[i].idRespuesta + '</td>';
                    s += '<td>' + data[i].respuesta + '</td>';
                    s += '<td>' + data[i].UsuarioRepuesta + '</td>';
                    s += '<td>' + button + '</td>';
                    s += '<tr>';
                    const tr = $(s);
                    oTable.row.add(tr[0]).draw();
                }
            }
        });
    }
}


function fnAgregarRespuestas() {
    var baseUrl = $("#hdnBaseUrl").val();
    var idUsuario = $("#hdnIdUsuario").val();
    var idPregunta = $("#hdnIdPregunta").val();
    var url = $("#hdnUrlUs").val();

    if (fnValidarAgregarRespuesta()) {
        $.ajax({
            url: baseUrl + "ForoBACApi/InsertarRespuesta", 
            type: "POST", 
            dataType: 'JSON',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({
                idUsuario: idUsuario,
                idPregunta: idPregunta, 
                respuesta: $("#txtRespuesta").val()
            }),
            beforeSend: function () {
                Procesando()
            }, success: function (data) {
                DesbloquearUI();
                if (data.success) {
                    MensajeDeExito("Exito", "Respuesta Agregada Exitosamente", url + "Home/Respuestas/" + idPregunta)
                } else {
                    MensajeDeError("Ups!, ocurrio un error");
                }
            }, error: function () {
                DesbloquearUI();
                MensajeDeError();
            }
        })
    }
}