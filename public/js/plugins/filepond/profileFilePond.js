import { createFileHandlers, createFilePond } from "./baseFilePond.js";


export const initProfileFilepond = (form, profile) => {

    const fields = {
        avatarPath: {
            value: profile.avatarPath,
            process: 'upload/profile/avatar',
            revert: 'text/profile/avatar',
            maxFileSize: '2MB'
        },
        coverPath: {
            value: profile.coverPath,
            process: 'upload/profile/cover',
            revert: 'text/profile/cover',
            maxFileSize: '5MB'
        }
    }

    Object.entries(fields).forEach(([name, config]) => {

        const input = form.querySelector(`[name="${ name }"]`);
        const key = input.name;
        const { onload, onerror } = createFileHandlers(form, key);

        if (!input) return;

        createFilePond(input, {
            files: config.value ? [
                {
                    source: config.value,
                    options: { type: 'local' }
                }
            ] : [],
            server: {
                process: {
                    url: config.process,
                    method: 'POST',
                    onload,
                    onerror
                },
                revert: {
                    url: config.revert,
                    method: 'POST',
                    onload,
                    onerror
                }
            },
            acceptedFileTypes: ['image/png', 'image/jpeg', 'image/webp'],
            maxFileSize: config.maxFileSize,
            allowImagePreview: true,
            allowMultiple: false,
            instantUpload: false
        });
    });
}