export const createFilePond = (input, options = {}) => {

    if (!window.FILEPOND_READY) {

        FilePond.registerPlugin(
            FilePondPluginImagePreview,
            FilePondPluginFileValidateSize,
            FilePondPluginFileValidateType
        );

        FilePond.setOptions({
            labelIdle: 'Arrastra y suelta tus archivos o <span class="filepond--label-action">Examinar</span>',
            labelFileProcessing: 'Subiendo',
            labelFileProcessingComplete: 'Subida completa',
            labelFileProcessingAborted: 'Subida cancelada',
            labelFileProcessingError: 'Error durante la subida',
            labelTapToCancel: 'toca para cancelar',
            labelTapToRetry: 'toca para reintentar',
            labelTapToUndo: 'toca para deshacer',
            labelFileWaitingForSize: 'Calculando tamaño',
            labelFileSizeNotAvailable: 'Tamaño no disponible',
            labelFileLoading: 'Cargando',
            labelFileLoadError: 'Error al cargar',
            labelFileRemoveError: 'Error al eliminar',
            labelMaxFileSizeExceeded: 'Archivo demasiado grande',
            labelMaxFileSize: 'El tamaño máximo es {filesize}',
            labelMaxTotalFileSizeExceeded: 'Tamaño total excedido',
            labelMaxTotalFileSize: 'Tamaño total permitido: {filesize}',
            labelFileTypeNotAllowed: 'Tipo de archivo no permitido',
            fileValidateTypeLabelExpectedTypes: 'Solo se permiten {allTypes}'
        });

        window.FILEPOND_READY = true;
    }

    FilePond.create(input, options);
}