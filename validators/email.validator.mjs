import { body } from 'express-validator';
import dns from 'dns';
import util from 'util';
import User from '../models/user.model.mjs';

const resolveMxAsync = util.promisify(dns.resolveMx);

const emailValidator = [
    body('email')
        .isEmail()
        .withMessage("Nieprawidłowy adres email")
        .custom(async value => {
            const domain = value.split('@')[1];
            return resolveMxAsync(domain)
                .then(addresses => {
                    if (addresses.length === 0) {
                        throw new Error('Email domain has no MX records');
                    }
                })
                .catch(() => {
                    throw new Error('Nieprawidłowy adres email');
                });
        })
        .withMessage("Nieprawidłowy adres email")
        .custom(async value => {
            const user = await User.findOne({where: {email: value}});
            if (user) throw Error("Email jest zajęty");
        })
        .withMessage("Adres email jest zajęty")
    ]

export default emailValidator;