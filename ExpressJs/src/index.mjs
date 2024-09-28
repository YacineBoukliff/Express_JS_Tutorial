import express from 'express';
import Joi from "joi"

const app = express()

app.use(express.json())

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
        nom: req.body.Nom  
    };
    users.push(user);
    res.send(user);
});


app.put('/api/utilisateurs/:id', (req,res) => {
    // Trouvez les id et gérer les erreurs 
    const parsedId = parseInt(req.params.id);
    const trouverId = users.find((user) => user.id === parsedId);

    if (isNaN(parsedId)) return res.status(400).send("Ce n'est pas un nombre");
    if (!trouverId) return res.status(404).send("Erreur de Id");
// Validaiton avec les erreurs 
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