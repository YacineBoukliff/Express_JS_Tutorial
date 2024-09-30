import express from 'express';
import Joi from "joi"
import helmet from "helmet"
import morgan from "morgan"
import { log } from './logger.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express()

if(app.get('env') === 'development'){
    app.use(morgan("tiny"));
    console.log("Morgan activé")
}

console.log("Environnement actuel :", app.get('env'));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(helmet())
app.use(morgan("tiny"));

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
    res.send("Bienvenue!")
})

app.get("/api/utilisateurs", (req,res) => {
    res.send(users)
})

app.get("/api/utilisateurs/:id",(req,res) => {
    const parsedId = parseInt(req.params.id)
 const trouverId = users.find((user) => user.id === parsedId)

 if(isNaN(parsedId)) return res.send( " Ce n'est pas un nombre ")
 if(!trouverId) return res.status(404).send("Erreur de Id")
 
 res.send(trouverId)
})

app.post('/api/utilisateurs', (req, res) => {
    const schema = Joi.object({
        nom: Joi.string().min(3).required()
    });

    const validationResult = schema.validate(req.body);
    console.log(validationResult)

    if (validationResult.error) {
        return res.status(400).send("Rentrez un nom valide");
    }
   
    const user = {
        id: users.length + 1,
        nom: req.body.nom  
    };
    users.push(user);
    res.send(user);
});


app.put('/api/utilisateurs/:id', (req,res) => {
    const parsedId = parseInt(req.params.id);
    const trouverId = users.find((user) => user.id === parsedId);

    if (isNaN(parsedId)) return res.status(400).send("Ce n'est pas un nombre");
    if (!trouverId) return res.status(404).send("Erreur de Id"); 
    const schema = Joi.object({
        Nom: Joi.string().min(3).required()
    });

    const validationResult = schema.validate(req.body);
    console.log(validationResult);

    if (validationResult.error) {
        return res.status(400).send("Rentrez un nom valide");
    }
// Mettre a jour  
    trouverId.Nom = req.body.Nom;
    res.send(trouverId);
})


app.delete('/api/utilisateurs/:id', (req,res) => {
    const parsedId = parseInt(req.params.id);
    const trouverId = users.find((user) => user.id === parsedId);

    if (isNaN(parsedId)) return res.status(400).send("Ce n'est pas un nombre");
    if (!trouverId) return res.status(404).send("Erreur de Id");

    const index = users.indexOf(trouverId)
    users.splice(index, 1)
    res.send(trouverId)
})