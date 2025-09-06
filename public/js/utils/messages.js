export const showFormErrorToast = (data) => {
    Swal.fire({
        toast: true,
        position: 'top-end',
        title: 'Campos incorrectos',
        text: data.message,
        icon: 'warning',
        showConfirmButton: false,
        timer: 3000
    });
}

export const showSuccessToast = (data) => {
    Swal.fire({
        toast: true,
        position: 'top-end',
        title: data.message,
        icon: 'success',
        showConfirmButton: false,
        timer: 3000
    });
}

export const showNoContentToast = (data) => {
    Swal.fire({
        toast: true,
        position: 'top-end',
        title: 'Sin resultados encontrados',
        icon: 'info',
        showConfirmButton: false,
        timer: 3000
    });
}

export const showServerErrorToast = (data) => {
    Swal.fire({
        title: 'Error del servidor',
        text: data.message,
        icon: 'error',
        confirmButtonText: 'Aceptar'
    });
}

export const showErrorToast = () => {
    Swal.fire({
        title: 'Error del servidor',
        text: 'Error de conexión con el servidor',
        icon: 'error',
        confirmButtonText: 'Aceptar'
    });
}