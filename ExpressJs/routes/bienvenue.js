import express from 'express';
const router = express.Router()
export default router 

router.get("/", (req,res) => {
    res.render('index',{
        title : "Express ", 
        message : "Test de merde GDSGDS "
    })
})

