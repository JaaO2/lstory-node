import express from 'express';
import { validationResult } from 'express-validator';
import User from '../../models/user.model.mjs';
import emailValidator from '../../validators/email.validator.mjs';
import usernameValidator from '../../validators/username.validator.mjs';
import passwordValidator from '../../validators/password.validator.mjs';
import rulesCheckValidator from '../../validators/rules_check.validator.mjs';
import mailSingleton from '../../mail/mail.mjs';
import verification from '../../mail/templates/verification.mail.template.mjs';
import usernameLoginValidator from '../../validators/username.login.validator.mjs';
import passwordLoginValidator from '../../validators/password.login.validator.mjs';

const router = express.Router();

router.use(express.json())

router.post('/register', [...usernameValidator, ...emailValidator, ...passwordValidator, ...rulesCheckValidator], 
async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(200).json({ errors: errors.array() });
    }

    const data = req.body;
    const user = User.build({username: data.username, display_username: data.username, password: data.password, email: data.email});
    const result = await user.save();
    const mail = mailSingleton.getInstance().connection;
    const mailOptions = verification({username: data.username, email: data.email, link: "https://lstory.eu"});
    mail.sendMail(mailOptions)

    res.status(201).json({ message: "created" });
});

router.post('/login', [usernameLoginValidator, passwordLoginValidator], 
async (req, res) => {    
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(200).json({errors: errors.array()});
    }

    res.status(201).json({message: "Login"});
})

export default router;
