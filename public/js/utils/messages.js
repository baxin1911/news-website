const showToast = (title, text, icon) => {

    Swal.fire({
        toast: true,
        position: 'top-end',
        title: title,
        text: text,
        icon: icon,
        showConfirmButton: false,
        timer: 3000
    });
}

const showErrorMessage = (text) => {

    Swal.fire({
        title: 'Error del servidor',
        text: text || 'Error de conexión con el servidor',
        icon: 'error',
        confirmButtonText: 'Aceptar'
    });
}

export const showFormWarningToast = (data) => {

    showToast('Campos incorrectos', data.message, 'warning');
}

export const showRateLimitWarningToast = (data) => {

    showToast('Demasiados intentos', data.message, 'warning');
}

export const showSuccessToast = (data) => {

    showToast(data.message, null, 'success');
}

export const showNoContentToast = (data) => {

    showToast('Sin resultados encontrados', null, 'info');
}

export const showServerErrorToast = (data) => {

    showErrorMessage(data.message);
}

export const showErrorToast = () => {

    showErrorMessage(null);
}