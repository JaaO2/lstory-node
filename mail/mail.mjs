import nodemailer from 'nodemailer';

class mailSingleton {
    static instance;

    constructor () {
       if (mailSingleton.instance) return mailSingleton.instance;

        this._initializeMailConnection();
        mailSingleton.instance = this;

    }

    _initializeMailConnection = () => {
        this.connection = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: false,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD
            }
        })
    }


    static getInstance = () => {
        if (!mailSingleton.instance) mailSingleton.instance = new mailSingleton();
        return mailSingleton.instance;
    }
}

export default mailSingleton;