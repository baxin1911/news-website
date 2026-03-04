import { AppError } from "./appError.js";

export class EmptyFileError extends AppError {
    constructor() {
        super('Archivo vacío', 'EMPTY_FILE', 400);
    }
}

export class InvalidImagePathError extends AppError {
    constructor() {
        super('Ruta de imagen no válida', 'INVALID_IMAGE_PATH', 400);
    }
}

export class InvalidFileError extends AppError {
    constructor() {
        super('Archivo no válido', 'INVALID_FILE', 400);
    }
}

export class UnauthUserEditFileError extends AppError {
    constructor() {
        super('Usuario no autorizado para editar este archivo', 'UNAUTH_USER_EDIT_FILE', 403);
    }
}

export class FileNotFoundError extends AppError {
    constructor() {
        super('Archivo no encontrado', 'FILE_NOT_FOUND', 404);
    }
}

export class ServerFileSystemError extends AppError {
    constructor() {
        super('Error en el sistema de archivos del servidor', 'SERVER_FILE_SYSTEM_ERROR', 500);
    }
}