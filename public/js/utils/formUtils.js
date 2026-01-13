export const clearFileInputs = (form, data) => {

    form.querySelectorAll('input[type="file"]').forEach(input => {

        const key = input.name;
        const value = data[key];

        if (value instanceof File) data[key] = null;
    });
}