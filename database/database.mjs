import { Sequelize } from "sequelize";
import 'dotenv/config';

class DatabaseSingleton {
    
    static instance;
    static retry = 1;

    constructor() {
        if (DatabaseSingleton.instance) {
            return DatabaseSingleton.instance;
        }

        this._initializeConnection();
        DatabaseSingleton.instance = this;
    }

    _initializeConnection() {
        if (!process.env.DATABASE_NAME || !process.env.DATABASE_USER || !process.env.DATABASE_PASSWORD || !process.env.DATABASE_HOST) {
            console.error("Nie wszystkie zmienne środowiskowe są ustawione.");
            throw new Error("Nie można zainicjować połączenia z bazą danych bez odpowiednich zmiennych środowiskowych.");
        }

        this.connection = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
            host: process.env.DATABASE_HOST,
            port: process.env.DATABASE_PORT,
            dialect: 'postgres',
            timezone: process.env.TIMEZONE
        });

        this.connection.authenticate()
            .then(() => console.log("Połączenie z bazą danych zostało pomyślnie ustanowione."))
            .catch(error => {
                console.error("Nie można połączyć się z bazą danych:", error.message)
                if (DatabaseSingleton.retry <= 5) {
                    console.error(`Ponowna próba łączenia z bazą danych #${DatabaseSingleton.retry}: `)
                    setTimeout(() => {
                        DatabaseSingleton.retry++;
                        this._initializeConnection();
                    }, 1500)
                } else {
                    console.error("NIE UDAŁO SIĘ POŁĄCZYĆ Z BAZĄ DANYCH PODCZAS 5 PRÓB");
                    process.exit();
                }
            });
    }

    static getInstance() {
        if (!DatabaseSingleton.instance) {
            DatabaseSingleton.instance = new DatabaseSingleton();
        }

        return DatabaseSingleton.instance;
    }
}

export default DatabaseSingleton;

