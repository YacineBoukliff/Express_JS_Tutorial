import express from 'express';
import Joi from "joi"


const app = express()

app.use(express.json())

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Demarre sur le port : ${PORT}`)
})

const users = [
    {id : 1, Nom: "yacine"},
    {id : 2, Nom: "yacine"},
    {id : 3, Nom: "yacine"},
]



app.get("/api/utilisateurs", (req,res) => {
    res.send(users)
})

app.post('/api/utilisateurs', (req, res) => {
    const schema = Joi.object({
        nom: Joi.string().min(3).required()
    });

    const validationResult = schema.validate(req.body);

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

app.get("/", (req,res) => {
    res.send("Bienvenue!")
})