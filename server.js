const express = require('express');
const app = express();
const dotenv = require("dotenv");
dotenv.config();
require('./src/database')
const routes = require("./src/routes/routes")
app.use(express.urlencoded({extended: true})); //POST SOMETHING
app.use(express.json());    
app.use(routes)
app.listen(4005, () => {
    console.log('Listening in the port 4000\n CTRL + CLICK to get into it: http://localhost:4000');
})

