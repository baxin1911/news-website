import express from 'express';
import { validateDisplayName, validateLastName, validateName, validatePassword } from '../../helpers/validations/user';
import { validateRepeatedPassword } from '../../helpers/validations/auth';

const router = express.Router();

router.put('/users/:id', (req, res, next) => {
    const { displayName, profilePicture, coverPicture, name, lastName, password, repeatedPassword } = req.body || {};
    const errors = {
        displayNameError: validateDisplayName(displayName),
        nameError: validateName(name),
        lastNameError: validateLastName(lastName),
        passwordError: validatePassword(password),
        repeatedPasswordError: validateRepeatedPassword(password, repeatedPassword)
    }
    const hasErrors = Object.values(errors).some(error => error);

    if (hasErrors) return res.status(400).json({ errors, message: 'Errores de validación' });

    next();
});

export default router;