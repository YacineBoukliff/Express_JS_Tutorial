import express from 'express';

const app = express()

const test = process.env.test

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Demarre sur le port : ${PORT}`)
})


const mockusers = [
    {id : 1, Nom: "yacine",NomAfficher : "Yacine"},
    {id : 2, Nom: "yacine",NomAfficher : "1"},
    {id : 3, Nom: "yacine",NomAfficher : "2"},
]

app.get("/Utilisateurs", (req,res) => {
    res.send("Bienvenue a toi Utilisateur")
})

app.get("/Compte", (req,res) => {
    res.status(201).send({ Salut : " Toi "})
})

app.get("/api/users", (req,res) => {
res.send(mockusers)
})

app.get('/api/users/:id' ,(req,res) => {
console.log(req.params)
const parsedId = parseInt(req.params.id)
console.log(parsedId)

if (isNaN(parsedId))
    return res.status(400).send({msg: " Id invalide "})

const findUsers = mockusers.find((user) => user.id === parsedId)

if (!findUsers) return res.sendStatus(404)
    else {res.send(findUsers)} 
})

