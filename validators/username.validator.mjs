import { body } from 'express-validator';
import User from '../models/user.model.mjs';

const usernameValidator = [
    body('username')
        .isLength(3,15)
        .withMessage("Nazwa użytkownika musi mieć od 3 do 15 znaków")
        .custom (async value => {
            const user = await User.findOne({where: {username: value, display_username: value}});
            if (user) throw Error("Nazwa użytkownika jest zajęta");
        })
        .withMessage("Nazwa użytkownika jest zajęta")
];

export default usernameValidator;