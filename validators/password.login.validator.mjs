import { body } from 'express-validator';
import User from '../models/user.model.mjs';

const passwordLoginValidator = [
    body('password')
        .custom (async value => {
            if (!value || !value.length) throw Error('Hasło jest wymagane');
        })
        .withMessage("Hasło jest wymagane")
        .custom(async (value, {req}) => {
            const user = await User.findOne({where: {username: req.body.username}});
            if (user) {
                const checkPassword = await user.checkPassword(value);
                if (!checkPassword) throw Error("Podane hasło jest nieprawidłowe")
            }
        })
        .withMessage("Podane hasło jest nieprawidłowe")
];

export default passwordLoginValidator;