const express = require('express')
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./config/connectDB')
const router = require('./routes/index')
const cookiesParser = require('cookie-parser')
const { app, server } = require('./socket/index')

// const app = express()
// app.use(cors({
//     origin : process.env.FRONTEND_URL,
//     credentials : true,
//     methods:['GET','DELETE','PUT','UPDATE']
// }))
const corsOptions = {
  origin: ['http://localhost:3001', 'https://chatfullstack.vercel.app'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Enable CORS for requests with credentials
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(express.json())
app.use(cookiesParser())

const PORT = process.env.PORT || 8080

app.get('/',(req,res)=>{
    res.json({
        message : "Server running at " + PORT
    })
})

//api endpoints
app.use('/api',router)

connectDB().then(()=>{
    server.listen(PORT,()=>{
        console.log("server running at and db connected" + PORT)
    })
})


