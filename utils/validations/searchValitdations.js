import { isEmptyOrNull } from "../validationsUtils.js";

export const validateQuery = (q) => isEmptyOrNull(q, 'La consulta de búsqueda');