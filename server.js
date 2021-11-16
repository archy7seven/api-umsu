const express = require('express')
const app = express()
const pjson = require('./package.json')
const routes = require('./routes/routes')

app.set('port',process.env.PORT || 3000)
app.use(express.json())
app.use(express.urlencoded())


app.use(function (req,res,next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin,Content-Type, Accept"
    )
    next()
})

app.get('/',(req,res)=>{
    res.json({message : `Selamat Datang di Restfull Api UMSU ${pjson.version}`})
})

app.use('/',routes)

app.use(function (req,res,next) {
    res.json({message: `Mau nyari apa di ${req.originalUrl} ??`})
})

app.listen(app.get('port'),()=>{
    console.log("start server on port "+app.get('port'))
})