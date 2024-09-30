import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import Joi from "joi";
import helmet from "helmet";
import morgan from "morgan";
import config from "config";
import { log } from './logger.js';
import utilisateurs from "../routes/utilisateurs.js";
import bienvenue from "../routes/bienvenue.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
process.env.NODE_CONFIG_DIR = path.join(__dirname, '..', 'config');

const app = express();

app.set('view engine', 'pug');
app.set('views', "../views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("tiny"));
app.use(log);

app.use(function (req, res, next) {
    console.log("Authentification");
    next();
});

app.use('/api/utilisateurs', utilisateurs);
app.use('/', bienvenue);

const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));


console.log('Application Name : ' + config.get('name'));
console.log('Mail serveur : ' + config.get('mail.host'));
console.log("Environnement actuel :", app.get('env'));

if (app.get('env') === 'development') {
    console.log("Morgan activé");
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Demarre sur le port : ${port}`);
});