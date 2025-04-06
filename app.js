const http = require('http')
const cors = require('cors')
const express = require('express')
const app = express()

const port = process.env.PORT || 4000

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.use('/api/doc', require('./api/docs'))

app.get('/', (req, res)=>{
    res.json({message: 'Welcome to Docman Backend API verison@1.0.0'})
})

const server = http.createServer(app)

server.listen(port, ()=>console.log(`Backend app is running on http://localhost:${port}`))