
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const handlebars = require('express-handlebars')

const app = express()

var hbs = handlebars.create();

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars')


const authRouter = require('./src/routes/auth.router')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use("/assets",express.static(__dirname+"/html/assets"))


app.get('/', (req, res) => {
    res.render("dashboard")
})
app.get('/dashboard', (req, res) => {
    res.render("dashboard")
})
app.use('/api', authRouter)



app.listen(3000)