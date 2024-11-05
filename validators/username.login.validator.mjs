import { body } from 'express-validator';
import User from '../models/user.model.mjs';

const usernameLoginValidator = [
    body('username')
        .custom (async value => {
            if (!value || !value.length) throw Error('Nazwa użytkownika jest wymagana');
        })
        .withMessage("Nazwa użytkownika jest wymagana")
        .custom(async value => {
            if (value && value.length) {
                const user = await User.findOne({where: {username: value}})
                if (!user) throw Error("Nie znaleziono użytkownika z taką nazwą"); 
            }
        })
        .withMessage("Nie znaleziono użytkownika z taką nazwą")
        .custom(async value => {
            if (value && value.length) {
                const user = await User.findOne({where: {username: value}})
                if(user) {
                    if (!user.activation_date) throw Error("Dziękujemy za rejestrację! Aby dołączyć do gry musisz jeszcze zweryfikować adres email")
                }
            }
        })
        .withMessage("Dziękujemy za rejestrację! Aby dołączyć do gry musisz jeszcze zweryfikować adres email")
];

export default usernameLoginValidator;