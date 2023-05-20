const express = require('express');
const app = express();
const productRoutes = require('./routes/product.routes.js');

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get("/", (request, response) => {
    response.send({
        msg: `Bienvenidas/os a mi servidor uwu`,
        ok: true
    })
});

// Defining routes for my express app
app.use(productRoutes);

module.exports = app;