export const closeModal = (idModal, form) => {
    
    const modalHtml = document.getElementById(idModal);
    const modal = mdb.Modal.getInstance(modalHtml);

    modalHtml.addEventListener('hidden.mdb.modal', () => {
        form.reset();
    });
    modal.hide();
}

export const showModal = (idModal) => {

    const modalHtml = document.getElementById(idModal);
    const modal = new mdb.Modal(modalHtml);

    modal.show();
}

export const handlerModalWithFlashMessage = (flash) => {

    if (!flash) return;

    const { code } = flash;

    switch (code) {
        case 'LOGIN_ERROR_GOOGLE':
            showModal('loginModal');
            break;
        default:
            break;
    }
}