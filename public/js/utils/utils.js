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

export const toggleErrorMessages = (errors) => {

    Object.entries(errors).forEach(([id, message]) => {

        const element = document.getElementById(id);

        if (message) {

            element.textContent = message;
            element.hidden = false;
            element.ariaHidden = false;

        } else {

            element.textContent = null;
            element.hidden = true;
            element.ariaHidden = true;
        }
    });
}

export const closeModal = (idModal, form) => {
    
    const modalHtml = document.getElementById(idModal);
    const modal = new mdb.Modal(modalHtml);

    modalHtml.addEventListener('hidden.bs.modal', () => {
        form.reset();
    });
    modal.hide();
}