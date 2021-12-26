const router = require('express').Router()
const db = require("../db")
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = process.env
const { verifyToken } = require('../middlewares/auth.middlewares')
router.get('/auth',  async (req, res) => {
    const { user, password } = req.query
    const authUser = await db.userAuth(user, password)
    if(authUser == 1){

        const token = jwt.sign({ user, password }, JWT_SECRET, { expiresIn: '1800s' })
        const retorno = {
            "token": token
        }

        res.send(retorno)
    }else{
        res.sendStatus(406)
    }
})

router.get('/dados', verifyToken, async (req, res) => {
    const dados = await db.selectDados()
    res.send(dados)
})
router.get('/totalEstados', verifyToken, async (req, res) => {
    const dados = await db.selectTotalEstados()
    res.send(dados)
})
router.get('/totalTipo', verifyToken, async (req, res) => {
    const dados = await db.selectTipoEstados()
    res.send(dados)
})
router.get('/totalProduto', verifyToken, async (req, res) => {
    const dados = await db.selectProdutoEstados()
    res.send(dados)
})


module.exports = router