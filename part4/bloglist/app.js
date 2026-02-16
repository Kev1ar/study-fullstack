const express = require('express')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')

const app = express()

const mongoUrl = 'mongodb+srv://kaiser-of-code:4BeExC9DCEVuffiW@dev-cluster.io9zcjr.mongodb.net/blogApp?retryWrites=true&w=majority&appName=dev-cluster'
mongoose.connect(mongoUrl, { family: 4 })

app.use(express.json())

app.use('/api/blogs', blogsRouter)

module.exports = app