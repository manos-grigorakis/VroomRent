require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const app = express()
const port = 3000


// Connection with database
mongoose.connect(process.env.MONGODB_URI, {
}).then(() => {
    console.log('Connected to MongoDB Atlas');
}).catch((error) => {
    console.error('Error connecting to MongoDB Atlas', error);
});


// Test route!
app.get('/test', (req, res) => {
    res.send('Connected Successfully')
    console.log('Connected Successfully')
})

app.listen(port, () => {
    console.log(`Server listening on: http://localhost:${port}`)
})

