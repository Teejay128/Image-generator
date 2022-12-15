const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();
const openaiRouter = require('./routes/openaiRoutes');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")))

app.use('/openai', openaiRouter)

app.listen(PORT, (req, res) => {
    console.log(`Server is running on port ${PORT}`)
});