$(document).ready(function () {
    //#region Anexos
    var Anexos = []; //Arreglo para agregar los objetos de información
    var MaxAnexos = 0; //Variable de control de tamaño acumulado 
    var fileData = new FormData(); //Objeto de envío de datos
    //Objeto de cotejamiento para descripción de archivo
    const tipos = {
        "image/jpeg": "Fotografia Digital",
        "image/png": "Archivo de Imagen",
        "application/pdf": "Documento PDF",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "Documento Word",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "Hoja de cálculo de Excel"
    }

    //Evento change para determinar el número de archivos seleccionados y cambiar el label del input File
    $("#TipoDeRegistroContainer").on("change", "#anexo-archivos", function () {
        var archivos = $("#anexo-archivos").get(0).files;
        if (archivos.length > 0) {
            //Se oculta la leyenda de la validación
            $("#val-archivos").attr("hidden", true);

            $("#anexo-label").text(archivos.length > 1 ? archivos.length + " elementos seleccionados" : archivos.length + " elemento seleccionado");
        }
        else {
            $("#anexo-label").text("Buscar archivo");
        }
    });

    //Evento click para agregar anexos a la tabla
    $("#TipoDeRegistroContainer").on('click', "#anexo-btnAgregar", function () {
        $(".spinner-border").removeAttr("hidden");

        //Se obtiene el objeto del input de archivos
        var archivos = $("#anexo-archivos").get(0).files;

        //Se valida que se haya seleccionado un archivo
        if (archivos.length > 0) {
            //La función setTimeout sirve para forzar la visualización del spinner de carga mientras se realiza el siguiente procedimiento
            setTimeout(function () {
                // Se recorre el array del input file para obtener el nombre y archivo adjunto para ingresarlo al arreglo de archivos  
                for (var i = 0; i < archivos.length; i++) {
                    //Se almacenan las variables nombre y tipo para una lectura rápida
                    var nombre = archivos[i].name;
                    var tamaño = archivos[i].size;

                    //Se valida que el archivo seleccionado sea permitido
                    if (tipos.hasOwnProperty(archivos[i].type)) {
                        //Se guarda el tipo para lectura rapida
                        var tipo = tipos[archivos[i].type];

                        //Se valida que no se haya agregado el archivo previamente
                        if (Anexos.findIndex(a => a.Nombre == nombre) < 0) {
                            //Se valida que aún no se sobre pase el máximo acumulado = 15 MB (15728640 bytes), preveyendo el tamaño del archivo a adjuntar
                            if (MaxAnexos + tamaño < 15728640) {
                                //Se suma el elemento
                                MaxAnexos += tamaño;

                                //Se crea un registro para el arreglo de Anexos
                                Anexos.push({
                                    "Nombre": nombre,
                                    "Descripcion": tipo,
                                    "Tamaño": tamaño,
                                    "Archivo": null,
                                });

                                //Se agrega el archivo al objeto FormData
                                fileData.append(nombre, archivos[i]);

                                //Se imprime la fila en la tabla
                                var s = '<tr>';
                                s += '<td>' + tipo + '</td>';
                                s += '<td>' + nombre + '</td>';
                                s += '<td><button type="button" class="btn btn-outline-danger quitarAnexo"><i class="fas fa-trash mr-2"></i> Quitar</button></td>';
                                s += '<tr>';
                                const tr = $(s);
                                $('#anexo-tabla').DataTable().row.add(tr[0]).draw();
                            }
                            else {
                                Advertencia("El archivo excede el tamaño máximo de envío, no fue posible agregarlo a la lista");
                            }
                        }
                        else {
                            Advertencia("Este archivo ya ha sido agregado previamente");
                        }
                    }
                    else {
                        Advertencia("El tipo de archivo seleccionado no es permitido");
                    }
                }
                $(".spinner-border").attr("hidden", true);
                $("#anexo-label").text("Buscar archivo");
            }, 100);
        }
        else {
            $("#val-archivos").removeAttr("hidden");
        }
    });

    //Evento para eliminar anexos de la tabla, del objeto de información y reducir el tamaño de envio
    $('#TipoDeRegistroContainer').on('click', '.quitarAnexo', function () {
        //Se instancia la tabla
        var tabla = $('#anexo-tabla').DataTable();

        //Se busca el index de del archivo segun el nombre, en el arreglo de archivos
        var indexAdjunto = Anexos.findIndex(x => x.Nombre == tabla.row($(this).parents('tr')).data()[1])

        // Se verifica que el index a eliminar exista en el arreglo, entonces se elimina y a su vez, se quita en el arreglo de archivos a enviar
        if (indexAdjunto in Anexos) {
            fileData.delete(Anexos[indexAdjunto].Nombre);
            MaxAnexos -= Anexos[indexAdjunto].Tamaño;
            Anexos.splice(indexAdjunto, 1);
        }

        //Se elimina la fila de la tabla
        tabla.row($(this).parents('tr')).remove().draw();
    });
});