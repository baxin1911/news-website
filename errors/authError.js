import { AppError } from "./appError.js";

export class LoginError extends AppError {
    constructor() {
        super('Error de inicio de sesión', 'LOGIN_ERROR', 401);
    }
}

export class InvalidAuthError extends AppError {
    constructor() {
        super('Autenticación inválida', 'INVALID_AUTH', 401);
    }
}

export class DetectedReuseError extends AppError {
    constructor() {
        super('Reutilización detectada de token de refresco', 'DETECTED_REUSE', 401);
    }
}