import { body } from 'express-validator';

const rulesCheckValidator = [
   body('rules')
   .custom(async value => {
        if (value !== true) 
            throw Error("Musisz zatwierdzić regulamin");
    })
   .withMessage("Musisz zatwierdzić regulamin")

];

export default rulesCheckValidator;