require('dotenv').config({path:'./.env'})
const mongoose = require('mongoose')
const cors = require('cors')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
app.use(cors)
app.use(express.json)

mongoose
    .connect(process.env.DB_URI)
    .then(()=>{
        app.listen(PORT,()=>{
            console.log(`listening at ${PORT}, connected to DB`)
        })
    })
    .catch((e)=>{
        console.log(e)
    })

