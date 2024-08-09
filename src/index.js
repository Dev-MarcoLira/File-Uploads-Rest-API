require('dotenv').config()
const express = require('express')
const router = require('./routes')
const morgan = require('morgan')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')

const MONGO_USER = process.env.MONGO_USER
const MONGO_PASSWORD = process.env.MONGO_PASSWORD
const MONGO_DATABASE = process.env.MONGO_DATABASE

const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster1.kowtsmr.mongodb.net/${MONGO_DATABASE}?retryWrites=true&w=majority&appName=Cluster1`

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Connected')
}).catch((err)=>{
    console.log(err.message)
})


const app = express()

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(router)
app.use(morgan('dev'))
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')))



app.listen(process.env.PORT || 3333, () => console.log('Server is on.'))