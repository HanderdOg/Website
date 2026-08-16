const express = require("express");
const helmet = require("helmet");
const path = require("path");

const app = express();
const port = 3000;

app.use(helmet());

app.use(express.json());

app.use(express.static(path.join(__dirname)));

app.listen(port, () => {
    console.log('console listen to http://localhost:3000')
});