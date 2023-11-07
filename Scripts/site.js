function MensajeDeError(mensaje) {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: mensaje != null ? mensaje : "Ha ocurrido un error",
    })
}

function Advertencia(mensaje) {
    Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: mensaje
    })
}

function NotificacionSimple(titulo, mensaje, tiempo, redireccion) {
    Swal.fire({
        title: titulo,
        text: mensaje,
        showConfirmButton: false,
        timer: tiempo,
        timerProgressBar: true,
    }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
            window.location.href = redireccion != null ? redireccion : $("#urlBase").val() + "Home/Index";
        }
    })
}

function MensajeDeExito(titulo, mensaje, redireccion) {
    //Botones con colores bootstrap
    const mensajeExito = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-info'
        },
        buttonsStyling: false
    })

    mensajeExito.fire({
        title: titulo,
        text: mensaje,
        icon: 'success',
        showCancelButton: false,
        confirmButtonText: 'Regresar al Listado',
    }).then((result) => {
        if (result.isConfirmed) { //Regresar al listado indicado
            window.location.href = redireccion != null ? redireccion : $("#urlBase").val() + "Home/Index";
        }
    })
}

function MensajeDeActualizacion(titulo) {
    Swal.fire({
        icon: 'success',
        title: titulo,
        showConfirmButton: false,
        timer: 1500
    })
}

function ActualizacionToast(titulo) {
    //Elemento toast
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: 'success',
        title: titulo
    })
}

function Confirmacion(titulo, mensaje) {
    Swal.fire({
        title: titulo,
        text: mensaje,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, continuar',
        allowEscapeKey: false,
        allowOutsideClick: false,
    }).then((result) => {
        return result.isConfirmed;
    })
}

function Cargando() {
    $.blockUI({
        fadeIn: 200,
        fadeOut: 400,
        boxed: true,
        message: '<div class="row justify-content-center align-items-center"><span>Cargando controles... </span> <div class="spinner-border text-secondary spinner-border-sm ml-2" role="status"><span class="sr-only">Loading...</span></div></div>'
    });
}

function Procesando() {
    $.blockUI({
        fadeIn: 200,
        fadeOut: 400,
        boxed: true,
        message: '<div class="row justify-content-center align-items-center"><span>Procesando... </span> <div class="spinner-border text-secondary spinner-border-sm ml-2" role="status"><span class="sr-only">Loading...</span></div></div>'
    });
}

function DesbloquearUI() {
    $.unblockUI({ fadeOut: 200 });
}