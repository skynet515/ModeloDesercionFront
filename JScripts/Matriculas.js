$(document).ready(function () {
    fnListarMatriculas();
    $("#btnAgregarMatricula").on('click', function () {
        fnAgregarMatricula();
    });
    fnListarCatalogosMatricula();
});

function fnListarMatriculas() {
    var baseUrl = $("#hdnBaseUrl").val();
    $.ajax({
        url: baseUrl + "detallematricula/listados",
        type: "GET",
        beforeSend: function () {
            Procesando()
        },
        success: function (data) {
            if (data != null) {
                var oTable = $("#tblMatriculas").DataTable();
                oTable.clear();

                for (var i = 0; i < data.length; i++) {
                    var s = '';
                    var button = '<div class="btn-group">' +
                        '<button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Acciones</button>';
                    button += '<div class="dropdown-menu">';
                    button += '<a class="dropdown-item hand ResponderPregunta"><i class="fas fa-question mr-2"></i> Accion 1</a>';

                    s += '<tr>';
                    s += '<td>' + data[i].idDetalleMatriculaAlumno + '</td>';
                    s += '<td>' + data[i].nombreGrado + '</td>';
                    s += '<td>' + data[i].nombreTurno + '</td>';
                    s += '<td>' + data[i].nombreInstitucion + '</td>';
                    s += '<td>' + data[i].nombreModalidad + '</td>';
                    s += '<td>' + data[i].fechaMatricula + '</td>';
                    s += '<td>' + button + '</td>';
                    s += '<tr>';
                    const tr = $(s);
                    oTable.row.add(tr[0]).draw();
                }

                DesbloquearUI();
            }
        }
    })
}

function fnAgregarMatricula() {
    var baseUrl = $("#hdnBaseUrl").val();
    var url = $("#hdnUrlUs").val();

    var fechaActual = new Date();

    var dia = fechaActual.getDate();
    var mes = fechaActual.getMonth() + 1; // Sumamos 1 porque los meses comienzan en 0 (enero es 0).
    var año = fechaActual.getFullYear();

    var fechaA = (dia < 10 ? '0' : '') + dia + '/' + (mes < 10 ? '0' : '') + mes + '/' + año;

    var detalleMatricula = JSON.stringify({
        idGrado: parseInt($("#slcGrado option:selected").val()),
        idAlumno: parseInt($("#slcAlumno option:selected").val()),
        idTurno: parseInt($("#slcTurno option:selected").val()), 
        idInstitucion: parseInt($("#slcInstitucion option:selected").val()),
        idModalidad: parseInt($("#slcModalidad option:selected").val()),
        idEstadoMatricula: 1,
        AnioLectivo: fechaA,
        FechaMatricula: fechaA

    });

    console.log(detalleMatricula);

    $.ajax({
        url: baseUrl + 'detallematricula/',
        type: "POST",
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: detalleMatricula,
        beforeSend: function () {
            Procesando();
        },
        success: function (data, jqXHR, textStatus) {
            DesbloquearUI();
            console.log(data);
            if (data.ok) {

                MensajeDeExito("Éxito", "Alumno Matrículado Correctamente", url + 'Matricula/Index');

            } else {
                MensajeDeError("Ha ocurrido un Error");
            }
        },
        error: function (jqXHR, textStatus) {
            DesbloquearUI();
            if (jqXHR.status === 200) {
                MensajeDeExito("Éxito", "Alumno Matrículado Correctamente", url + 'Matricula/Index');

            } else {
                MensajeDeError("Ha ocurrido un Error");
            }
        }
    });

}

function fnListarCatalogosMatricula() {
    var baseUrl = $("#hdnBaseUrl").val();

    $.ajax({
        url: baseUrl + "catalogos/detallete/matricula",
        type: "GET",
        success: function (data) {
            datos = data;
            //combo tipo dependencia economica:
            $("#slcGrado").empty();
            $("#slcGrado").append('<option selected disabled>--Seleccione--</option > ');
            $.each(datos.lstgrado, function (key, value) {
                $("#slcGrado").select2().append('<option value="' + value.idGrado + '">' + value.nombreGrado + '</option>');
            });
            $("#slcTurno").empty();
            $("#slcTurno").append('<option selected disabled>--Seleccione--</option > ');
            $.each(datos.lstturno, function (key, value) {
                $("#slcTurno").select2().append('<option value="' + value.idTurno + '">' + value.nombreTurno + '</option>');
            });
            $("#slcModalidad").empty();
            $("#slcModalidad").append('<option selected disabled>--Seleccione--</option > ');
            $.each(datos.lstModalidad, function (key, value) {
                $("#slcModalidad").select2().append('<option value="' + value.idModalidad + '">' + value.nombreModalidad + '</option>');
            });
            $("#slcInstitucion").empty();
            $("#slcInstitucion").append('<option selected disabled>--Seleccione--</option > ');
            $.each(datos.lstinstitucion, function (key, value) {
                $("#slcInstitucion").select2().append('<option value="' + value.idInstitucion + '">' + value.nombreInstitucion + '</option>');
            });

        }
    });

    $.ajax({
        url: baseUrl + "alumno/listados/",
        type: "GET",
        success: function (data) {
            datos = data;
            //combo tipo dependencia economica:
            $("#slcAlumno").empty();
            $("#slcAlumno").append('<option selected disabled>--Seleccione--</option > ');
            $.each(datos, function (key, value) {
                $("#slcAlumno").select2().append('<option value="' + value.idAlumno + '">' + value.idAlumno + '</option>');
            });
            
        }
    });

}