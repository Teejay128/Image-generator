const express = require('express');
const path = require('path');
const rateLimit = require('express-rate-limit')
require('dotenv').config();

const openaiRouter = require('./routes/openaiRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")))

const limiter = rateLimit({
    windowMs:  60 * 1000, // 1 mins
    max: 10,
    standardHeaders: true,
    legacyHeaders: false
})

app.use(limiter);
app.set('trust proxy', 1) // Trust the first proxy

app.use('/openai', openaiRouter)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});