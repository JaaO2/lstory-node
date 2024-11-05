import express from 'express';
import * as path from 'path';
import cors from "cors";
import { fileURLToPath } from 'url';
import * as https from 'https'; // Importowanie modułu https
import * as fs from 'fs'; // Importowanie modułu fs
import dotenv from 'dotenv'; // Importowanie dotenv, aby załadować zmienne z .env
import databaseSingleton from './database/database.mjs';
import userController from './controllers/user/user.controller.mjs';

dotenv.config(); // Załadowanie zmiennych środowiskowych

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

const sequelize = databaseSingleton.getInstance().connection;

const synchronizeModels = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Wszystkie modele zostały zsynchronizowane.");
  } catch (error) {
    console.error("Błąd synchronizacji modeli:", error);
  }
};
synchronizeModels();

const corsOptions = {
  origin: ["https://lstory-react.test"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  credentials: true,
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/user', userController);

// Prosta trasa dla "/"
app.get('/', (req, res) => {
  res.send('Hello');
});

// Ładowanie certyfikatów z pliku .env
const sslOptions = {
  key: fs.readFileSync(process.env.SSL_KEY_PATH),
  cert: fs.readFileSync(process.env.SSL_CERT_PATH),
  ca: process.env.SSL_CA_PATH ? fs.readFileSync(process.env.SSL_CA_PATH) : undefined,
};

// Tworzenie serwera HTTPS
https.createServer(sslOptions, app).listen(port, () => {
  console.log(`Uruchomiono serwer HTTPS na porcie ${port}`);
});
