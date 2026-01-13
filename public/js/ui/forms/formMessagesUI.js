export const toggleErrorMessages = (form, errors) => {

    Object.entries(errors).forEach(([field, message]) => {

        const input = form.querySelector(`[name='${ field }']`);
        const feedback = form.querySelector(`[data-error-for='${ field }']`);

        if (!input || !feedback) return;

        if (message) {

            feedback.textContent = message;
            input.classList.add('is-invalid');

        } else {

            feedback.textContent = null;
            input.classList.remove('is-invalid');
        }
    });
}

export const toggleFileErrors = (form, errors) => {

    form.querySelectorAll('input[type="file"]').forEach(input => {

        const key = input.name;
        const value = errors[key];
        const feedback = form.querySelector(`[data-error-for='${ key }']`);

        if (!feedback) return;

        if (value) {

            feedback.textContent = value;
            feedback.classList.add('d-block');

        } else {

            feedback.textContent = null;
            feedback.classList.remove('d-block');
        }
    });
}