import { toggleErrorMessages } from '../utils/utils.js';

const form = document.getElementById('searchOffcanvasForm');

form.addEventListener('submit', async e => {

    e.preventDefault();

    const data = Object.fromEntries(new FormData(form));
    const errors = {};

    if (!data.errors) errors.textSearchOffcanvasInputError = !data.q ? 'Este campo es obligatorio' : '';

    toggleErrorMessages(errors);

    const hasErrors = Object.values(errors).some(error => error);

    if (hasErrors) return;

    const params = new URLSearchParams(data);

    const offcanvasElement = document.getElementById('menuOffcanvas');
    const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
    offcanvas.hide();

    window.location.href = `/search?${ params.toString() }`;
});