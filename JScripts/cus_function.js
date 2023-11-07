$(document).ready(function () {

    

    //Quitar bordes rojos

    $("#txtUsuario").on('input', function () {
        $("#txtUsuario").removeClass("border-danger");
        $("#val-cons-nombreUsuario").attr("hidden", true);
    });

    $("#txtClave").on('input', function () {
        $("#txtClave").removeClass("border-danger");
        $("#val-cons-clave").attr("hidden", true);
    });

    //Preguntas
    $("#txtPregunta").on('input', function () {
        $("#txtPregunta").removeClass("border-danger");
        $("#val-cons-pregunta").attr("hidden", true);
    });

    $("#txtRespuesta").on('input', function () {
        $("#txtRespuesta").removeClass("border-danger");
        $("#val-cons-respuesta").attr("hidden", true);
    });

});

function fnValidarCamposLoging() {
    var usuario = $("#txtUsuario").val().length > 0;
    var clave = $("#txtClave").val().length > 0;

    if (!usuario) {
        $("#txtUsuario").addClass("border-danger").focus();
        $("#val-cons-nombreUsuario").removeAttr("hidden");
    }

    if (!clave) {
        $("#txtClave").addClass("border-danger").focus();
        $("#val-cons-clave").removeAttr("hidden");
    }

    return usuario && clave;
}


function fnValidarAgregarPregunta() {
    var pregunta = $("#txtPregunta").val().length > 0;

    if (!pregunta) {
        $("#txtPregunta").addClass("border-danger").focus();
        $("#val-cons-pregunta").removeAttr("hidden");
    }

    return pregunta;
}

function fnValidarAgregarRespuesta() {
    var respuesta = $("#txtRespuesta").val().length > 0;

    if (!respuesta) {
        $("#txtRespuesta").addClass("border-danger").focus();
        $("#val-cons-respuesta").removeAttr("hidden");
    }

    return respuesta;
}

