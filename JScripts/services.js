$(document).ready(function () {
    var session = [];
    $("#btnIngresarLogin").on("click", function () {
        var baseUrl = $("#hdnBaseUrl").val();
        var urlInterna = $("#hdnUrlUs").val();

        if (fnValidarCamposLoging()) {

            $.ajax({
                url: baseUrl + "login/",
                type: "POST",
                dataType: 'JSON',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify({
                    username: $("#txtUsuario").val(),
                    password: $("#txtClave").val()
                }),
                beforeSend: function () {
                    Procesando()
                },
                success: function (data) {

                    DesbloquearUI();
                    if (data != null) {
                        //fnGrabarSesion(data.success.idUsuario);
                        console.log(data)
                        session = data;
                        $.ajax({
                            url: urlInterna + "Usuario/GrabarSesion",
                            type: "POST",
                            dataType: "JSON",
                            contentType: 'application/json',
                            dataType: 'json',
                            data: JSON.stringify({
                                usuario: session
                            }),
                            success: function (data) {
                                if (data.request) {
                                    NotificacionSimple("Bienvenido", "Esta cargando su espacio de trabajo", "2000", urlInterna + "Home/Index");
                                } else {
                                    MensajeDeError("Ha ocurrido un Error");
                                }
                            }
                        });


                    } else {
                        MensajeDeError("Usuario o contraseña Incorrecta");
                    }
                }, error: function () {
                    DesbloquearUI();
                    MensajeDeError("Ha ocurrido un Error");
                }
            });

        }



    });
    //Se obtiene el listado de las preguntas
    //fnListarPreguntas(session)

    $("#btnCrearUsuario").click(function () {
        var baseUrl = $("#hdnBaseUrl").val();
        var urlInterna = $("#hdnUrlUs").val();

        if (fnValidarCamposLoging()) {

            $.ajax({
                url: baseUrl + "ForoBACApi/InsertarUsuario",
                type: "POST",
                dataType: 'JSON',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify({
                    nombreUsuario: $("#txtUsuario").val(),
                    clave: $("#txtClave").val()
                }),
                beforeSend: function () {
                    Procesando()
                }, success: function (data) {
                    DesbloquearUI();
                    if (data.success) {
                        MensajeDeExito("Exito", "Usuario Registrado", url);
                    } else {
                        MensajeDeError("Usuario Existente");
                    }
                }, error: function () {
                    DesbloquearUI();
                    MensajeDeError("Ha ocurrido un Error");
                }
            });
        }
    });


});



function fnIniciarSesion() {



}


//function fnListarPreguntas(session) {

//    var baseUrl = $("#hdnBaseUrl").val();
//    var idRol = $("#idRol").val();

//    if (session != null) {
//        $.ajax({
//            url: baseUrl + "ForoBACApi/ListarPreguntas",
//            type: "POST",
//            success: function (data) {
//                var oTable = $('#tblPreguntas').DataTable();
//                oTable.clear();

//                for (var i = 0; i < data.length; i++) {
//                    var s = '';
//                    var button = '<div class="btn-group">' +
//                        '<button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Acciones</button>';
//                    button += '<div class="dropdown-menu">';

//                    if (idRol == 1) {
//                        button += '<a class="dropdown-item hand CerrarPregunta"><i class="fas fa-times mr-2"></i> Cerrar Pregunta</a>';
//                    } else {
//                        button += '<a class="dropdown-item hand ResponderPregunta" o href="/Home/Respuestas/' + parseInt(data[i].idPregunta) + '"><i class="fas fa-question mr-2"></i> Responder Pregunta</a>';
//                    }

//                    s += '<tr>';
//                    s += '<td>' + data[i].idPregunta + '</td>';
//                    s += '<td>' + data[i].pregunta + '</td>';
//                    s += '<td>' + data[i].nombreUsuario + '</td>';
//                    s += '<td>'+button+'</td>';
//                    s += '<tr>';
//                    const tr = $(s);
//                    oTable.row.add(tr[0]).draw();

//                }




//            }

//        })
//    }


//}





function fnGrabarSesion(idUsuario) {
    return idUsuario;
}

