$(document).ready(function () {

    var urlInterna = $("#hdnUrlUs").val();

    var urlActual = window.location.href;
    var partes = urlActual.split('/');

    var nuevaURL = partes[0] + '//' + partes[2] + '/' + partes[3] + '/' + partes[4];

    if (nuevaURL != urlInterna + 'Alumno/EditarAlumno') {
        fnListarCatalogos();
    }

    if (urlActual == urlInterna + 'Alumno' || urlActual == urlInterna + 'Alumno/Index') {
        fnListarAlumnos();
    }




    $("#btnGuardarAlumno").on('click', function () {
        fnAgregarAlumno();
    });

    $("#btnEditarAlumno").on('click', function () {
        fnEditarAlumno();
    });
});

function fnListarAlumnos() {
    var baseUrl = $("#hdnBaseUrl").val();
    var urlInterna = $("#hdnUrlUs").val();
    $.ajax({
        url: baseUrl + "alumno/listados/",
        type: "GET",
        beforeSend: function () {
            Procesando()
        },
        success: function (data) {
            if (data != null) {
                var oTable = $("#tblAlumnos").DataTable();
                oTable.clear();

                for (var i = 0; i < 25; i++) {
                    var s = '';
                    var button = '<div class="btn-group">' +
                        '<button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Acciones</button>';
                    button += '<div class="dropdown-menu">';
                    button += '<a class="dropdown-item hand" href="' + urlInterna + 'Alumno/EditarAlumno/' + data[i].idAlumno + '"><i class="fas fa-pencil-alt"></i>Editar</a>';
                    button += '</div>';
                    button += '</div>';

                    var probabilidad = parseFloat(data[i].probabilidad) * 100;

                    var color, estiloFuente;

                    if (probabilidad > 50) {
                        color = 'red';
                    } else {
                        color = 'green';
                    }

                    estiloFuente = 'bold';

                    s += '<tr>';
                    s += '<td>' + data[i].idAlumno + '</td>';
                    s += '<td>' + data[i].direccionResidencia + '</td>';
                    s += '<td>' + data[i].nombreConvivenciaFamiliar + '</td>';
                    s += '<td>' + data[i].nombreResidencia + '</td>';
                    s += '<td style="color: ' + color + '; font-weight: ' + estiloFuente + ';">' + probabilidad + '%' + '</td>';
                    s += '<td >' + button + '</td>';
                    s += '<tr>';
                    const tr = $(s);
                    oTable.row.add(tr[0]).draw();
                }

                DesbloquearUI();
            }
        }

    });
}

function fnListarCatalogos() {
    var baseUrl = $("#hdnBaseUrl").val();
    $.ajax({
        url: baseUrl + "catalogos/matricula/",
        type: "GET",
        success: function (data) {
            datos = data;
            //combo tipo dependencia economica:
            $("#slcDependenciaEconomica").empty();
            $("#slcDependenciaEconomica").append('<option selected disabled>--Seleccione--</option > ');
            $.each(datos.lstdependenciaeconomica, function (key, value) {
                $("#slcDependenciaEconomica").select2().append('<option value="' + value.idDependenciaEconomica + '">' + value.nombreDependenciaEconomica + '</option>');
            });

            //combo tipo residencia:
            $("#slcTipoResidencia").empty();
            $("#slcTipoResidencia").append('<option selected disabled>--Seleccione--</option > ');
            $.each(datos.lstresidencia, function (key, value) {
                $("#slcTipoResidencia").select2().append('<option value="' + value.idTipoResidencia + '">' + value.nombreResidencia + '</option>');
            });

            //combo Recursos basicos:
            $("#slcRecursosBasicos").empty();
            $("#slcRecursosBasicos").append('<option selected disabled>--Seleccione--</option > ');
            $.each(datos.lstrecursosbasicos, function (key, value) {
                $("#slcRecursosBasicos").select2().append('<option value="' + value.idRecursoBasico + '">' + value.nombreRecurso + '</option>');
            });

            //combo Tipo Vivienda:
            $("#slcTipoVivienda").empty();
            $("#slcTipoVivienda").append('<option selected disabled>--Seleccione--</option > ');
            $.each(datos.lstvivienda, function (key, value) {
                $("#slcTipoVivienda").select2().append('<option value="' + value.idTipoVivienda + '">' + value.nombreTipoVivienda + '</option>');
            });

            //combo Nacionalidad:
            $("#slcNacionalidad").empty();
            $("#slcNacionalidad").append('<option selected disabled>--Seleccione--</option > ');
            $.each(datos.lstnacionalidad, function (key, value) {
                $("#slcNacionalidad").select2().append('<option value="' + value.idNacionalidad + '">' + value.nacionalidad + '</option>');
            });

            //combo Sexo:
            $("#slcSexo").empty();
            $("#slcSexo").append('<option selected disabled>--Seleccione--</option > ');
            $.each(datos.lstsexo, function (key, value) {
                $("#slcSexo").select2().append('<option value="' + value.idSexo + '">' + value.sexo + '</option>');
            });

            //combo Convivencia:
            $("#slcConvivenciaFamiliar").empty();
            $("#slcConvivenciaFamiliar").select2().append('<option selected disabled>--Seleccione--</option > ');
            $.each(datos.lstconvivenciafamiliar, function (key, value) {
                $("#slcConvivenciaFamiliar").append('<option value="' + value.idConvivenciaFamiliar + '">' + value.nombreConvivenciaFamiliar + '</option>');
            });

        }
    });
}

function fnAgregarAlumno() {
    var baseUrl = $("#hdnBaseUrl").val();
    var urlInterna = $("#hdnUrlUs").val();
    var fecha = $("#txtAnioNacimiento").val();
    var partes = fecha.split('-');
    partes.reverse();

    // Reorganizar las partes en el nuevo formato
    var fechaFormateada = partes[0] + '/' + partes[1] + '/' + partes[2];
    var anio = new Date(fecha);

    var alumno = JSON.stringify({
        anioNacimiento: fechaFormateada,
        cantidadHermanos: parseInt($("#txtCantidadHermanos").val()),
        direccionResidencia: $("#txtDireccionAlumno").val(),
        estado: true,
        idConvivenciaFamiliar: parseInt($("#slcConvivenciaFamiliar option:selected").val()),
        idDependenciaEconomica: parseInt($("#slcDependenciaEconomica option:selected").val()),
        idTipoResidencia: parseInt($("#slcTipoResidencia option:selected").val()),
        idNacionalidad: parseInt($("#slcNacionalidad option:selected").val()),
        idSexo: parseInt($("#slcSexo option:selected").val()),
        idRecursoBasico: parseInt($("#slcRecursosBasicos option:selected").val()),
        idTipoVivienda: parseInt($("#slcTipoVivienda option:selected").val()),

    });


    $.ajax({
        url: baseUrl + 'alumno',
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: alumno,
        beforeSend: function () {
            Procesando();
        },
        success: function (data, jqXHR, textStatus) {
            DesbloquearUI();
            console.log(data);
            if (data.ok) {

                MensajeDeExito("Éxito", "Alumno registrado Correctamente, probabilidad de deserción: " + parseFloat(data.probabilidad) * 100 + '%', urlInterna + 'Alumno/Index');

            } else {
                MensajeDeError("Ha ocurrido un Error");
            }
        },
        error: function (jqXHR, textStatus) {
            DesbloquearUI();
            if (jqXHR.status === 200) {
                MensajeDeExito("Éxito", "Alumno registrado Correctamente, probabilidad de deserción: " + parseFloat(data.probabilidad) * 100 + '%', urlInterna + 'Alumno/Index');

            } else {
                MensajeDeError("Ha ocurrido un Error");
            }
        }
    });

}

function fnCargarVistaEditar(id) {
    var urlInterna = $("#hdnUrlUs").val();
    var idAlumno = id;
    $.ajax({
        url: urlInterna + 'Alumno/EditarAlumno/' + idAlumno,
        type: 'GET',
        data: parseInt(idAlumno),
        beforeSend: function () {
            Procesando();
        },
        success: function (data, jqXHR, textStatus) {
            DesbloquearUI();
            console.log(data);
            if (!data.success) {

                MensajeDeError("Ha ocurrido un Error");
            }
        },
        error: function (jqXHR, textStatus) {
            DesbloquearUI();

            MensajeDeError("Ha ocurrido un Error");

        }
    });
}

function fnEditarAlumno() {
    var baseUrl = $("#hdnBaseUrl").val();
    var urlInterna = $("#hdnUrlUs").val();
    var fecha = $("#txtAnioNacimiento").val();
    var partes = fecha.split('-');
    partes.reverse();

    // Reorganizar las partes en el nuevo formato
    var fechaFormateada = partes[0] + '/' + partes[1] + '/' + partes[2];


    var alumno = JSON.stringify({
        idAlumno: $("#hdnIdAlumno").val(),
        anioNacimiento: fechaFormateada,
        cantidadHermanos: parseInt($("#txtCantidadHermanos").val()),
        direccionResidencia: $("#txtDireccionAlumno").val(),
        estado: 1,
        idConvivenciaFamiliar: parseInt($("#slcConvivenciaFamiliar option:selected").val()),
        idDependenciaEconomica: parseInt($("#slcDependenciaEconomica option:selected").val()),
        idTipoResidencia: parseInt($("#slcTipoResidencia option:selected").val()),
        idNacionalidad: parseInt($("#slcNacionalidad option:selected").val()),
        idSexo: parseInt($("#slcSexo option:selected").val()),
        idRecursoBasico: parseInt($("#slcRecursosBasicos option:selected").val()),
        idTipoVivienda: parseInt($("#slcTipoVivienda option:selected").val()),

    });

    console.log(alumno);

    $.ajax({
        url: baseUrl + 'alumno',
        type: "PUT",
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: alumno,
        beforeSend: function () {
            Procesando();
        },
        success: function (data, jqXHR, textStatus) {
            DesbloquearUI();
            console.log(data);
            if (data.ok) {

                MensajeDeExito("Éxito", "Alumno editado Correctamente, probabilidad de deserción: " + parseFloat(data.probabilidad) * 100 + '%', urlInterna + 'Alumno/Index');

            } else {
                MensajeDeError("Ha ocurrido un Error");
            }
        },
        error: function (jqXHR, textStatus) {
            DesbloquearUI();
            if (jqXHR.status === 200) {
                MensajeDeExito("Éxito", "Alumno editado Correctamente, probabilidad de deserción: " + parseFloat(data.probabilidad) * 100 + '%', urlInterna + 'Alumno/Index');

            } else {
                MensajeDeError("Ha ocurrido un Error");
            }
        }
    });
}
