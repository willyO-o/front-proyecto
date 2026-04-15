import Swal from "sweetalert2";


export const notificacionToast = (texto, tipo = 'success') => {


    const tiposColores = {
        success: 'bg-success',
        error: 'bg-danger',
        warning: 'bg-warning',
        info: 'bg-info',
        question: 'bg-primary',
    }

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        customClass: {
            timerProgressBar: 'bg-' + (tiposColores[tipo] || 'secondary')
        },
        timer: 5000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    })

    Toast.fire({
        icon: tipo,
        title: texto
    });
}


export const notificarError = (errors) => {

    const errorCode = errors.status

    if (errorCode == 422) {

        const errores = errors.data?.errors

        let mensajes = '';

        if (typeof errores === 'object') {

            mensajes = Object.values(errores).flat().map(mensaje => `<p class="text-danger mb-1">${mensaje}</p>`).join('')

        } else if (typeof errores === 'string') {
            mensajes = `<p class="text-danger mb-1">${errores}</p>`
        }

        Swal.fire({
            icon: 'error',
            title: '¡Error de Validación!',
            html: mensajes
        });

    }

    if (errorCode == 404) {
        Swal.fire("¡Error!", "El recurso solicitado no fue encontrado", "error")
    }
    if (errorCode == 500) {
        Swal.fire("¡Error!", "Ocurrió un error interno del servidor", "error")
    }




}


export const confirmarAccion = async (mensaje, txtBoton = 'Sí, eliminar') => {

    const confirmacion = await Swal.fire({
        title: "Estas Seguro?",
        html: mensaje,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: txtBoton
    })
    return confirmacion.isConfirmed

}