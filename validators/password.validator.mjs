import { body } from 'express-validator';

const passwordValidator = [
    body('password')
    .isLength(5)
    .withMessage("Hasło musi mieć przynajmniej 5 znaków"),
    body('password_repeat')
    .custom(async (value, { req }) => {
        if(value !== req.body.password) throw Error("Podane hasła nie są takie same");
    })
    .withMessage('Podane hasła nie są takie same')

];

export default passwordValidator;