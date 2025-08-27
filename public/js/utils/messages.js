export const showToast = (data) => {
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

export const showSuccessMessage = (data) => {
    Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: data.message,
        showConfirmButton: false,
        timer: 3000
    });
}

export const showServerErrorMessage = (data) => {
    Swal.fire({
        title: 'Error del servidor',
        text: data.message,
        icon: 'error',
        confirmButtonText: 'Aceptar'
    });
}

export const showErrorMessage = () => {
    Swal.fire({
        title: 'Error del servidor',
        text: 'Error de conexión con el servidor',
        icon: 'error',
        confirmButtonText: 'Aceptar'
    });
}