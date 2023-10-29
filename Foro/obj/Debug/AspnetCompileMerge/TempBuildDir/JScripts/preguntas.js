﻿$(document).ready(function () {
    var session = $("#idUsuario").val();
    $("#btnGuardarPregunta").on("click", function () {
        fnAgregarPregunta();
    });

    fnListarPreguntas(session);
});

function fnListarPreguntas(session) {

    var baseUrl = $("#hdnBaseUrl").val();
    var idRol = $("#idRol").val();

    if (session != null) {
        $.ajax({
            url: baseUrl + "ForoBACApi/ListarPreguntas",
            type: "POST",
            success: function (data) {
                var oTable = $('#tblPreguntas').DataTable();
                oTable.clear();

                for (var i = 0; i < data.length; i++) {
                    var s = '';
                    var button = '<div class="btn-group">' +
                        '<button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Acciones</button>';
                    button += '<div class="dropdown-menu">';

                    if (idRol == 1) {
                        button += '<a class="dropdown-item hand CerrarPregunta"><i class="fas fa-times mr-2"></i> Cerrar Pregunta</a>';
                    } else {
                        button += '<a class="dropdown-item hand ResponderPregunta" o href="/Home/Respuestas/' + parseInt(data[i].idPregunta) + '"><i class="fas fa-question mr-2"></i> Responder Pregunta</a>';
                    }

                    s += '<tr>';
                    s += '<td>' + data[i].idPregunta + '</td>';
                    s += '<td>' + data[i].pregunta + '</td>';
                    s += '<td>' + data[i].nombreUsuario + '</td>';
                    s += '<td>' + button + '</td>';
                    s += '<tr>';
                    const tr = $(s);
                    oTable.row.add(tr[0]).draw();

                }




            }

        })
    }


}

function fnAgregarPregunta() {

    var pregunta = $("#txtPregunta").val();
    var baseUrl = $("#hdnBaseUrl").val();
    var url = $("#hdnUrlUs").val();
    

    if (fnValidarAgregarPregunta()) {
        $.ajax({
            url: baseUrl + "ForoBACApi/InsertarPregunta", 
            type: "POST",
            dataType: 'JSON',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({
                idUsuario: $("#hdnIdUsuario").val(),
                pregunta: pregunta
            }),
            beforeSend: function () {
                Procesando();
            },
            success: function (data) {
                DesbloquearUI();
                if (data.success) {
                    MensajeDeExito("Exito", "Pregunta Agregada Exitosamente", url + "Home/Index")
                } else {
                    MensajeDeError("Ups!, ocurrio un error");
                }
            }, error: function () {
                DesbloquearUI();
                MensajeDeError("Ups!, ocurrio un error");
            }
        });
    }
}