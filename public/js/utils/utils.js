export const formatShortDate = (date) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(date).toLocaleDateString('es-MX', options);
}

export const getCategory = (categoryId) => {
    switch (categoryId) {
        case 1:
            return 'Gamming';
        case 2:
            return 'Entretenimiento';
        case 3:
            return 'Deportes'
        case 4:
            return 'Tecnología'
        default:
            return 'Sin categoría';
    }
}

export const toggleErrorMessages = (form, errors) => {

    const inputs = form.querySelectorAll('input');

    Object.entries(errors).forEach(([id, message], index) => {

        const element = document.getElementById(id);

        if (message) {

            element.textContent = message;
            inputs[index].classList.add('is-invalid');

        } else {

            element.textContent = null;
            inputs[index].classList.remove('is-invalid');
        }
    });
}

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