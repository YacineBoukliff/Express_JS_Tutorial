import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import Joi from "joi"
import helmet from "helmet"
import morgan from "morgan"
import config from "config"
import { log } from './logger.js';
import utilisateurs from "../routes/utilisateurs.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

process.env.NODE_CONFIG_DIR = path.join(__dirname, '..', 'config');

const app = express()

app.set('view engine','pug')
app.set('views', "../views")

console.log('Application Name : ' + config.get('name'))
console.log('Mail serveur : ' + config.get('mail.host'))

if(app.get('env') === 'development'){
    app.use(morgan("tiny"));
    console.log("Morgan activé")
}

console.log("Environnement actuel :", app.get('env'));

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(helmet())
app.use(morgan("tiny"));
app.use('/api/utilisateurs', utilisateurs)

const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));

app.use(log)

app.use(function (req,res,next ) {
    console.log("Authentification")
    next()
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Demarre sur le port : ${port}`)
})

const users = [
    {id : 1, Nom: "yacine"},
    {id : 2, Nom: "norhane"},
    {id : 3, Nom: "Samsung"},
]

app.get("/", (req,res) => {
    res.render('index',{
        title : "Express ", 
        message : "Test de merde GDSGDS "
    })
})

