const express = require('express');
const app = express();
const productRoutes = require('./routes/product.routes.js');
const userRoutes = require('./routes/user.routes.js');
const orderRoutes = require('./routes/order.routes.js');

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get("/api/", (request, response) => {
    response.send({
        msg: `Bienvenidas/os a mi servidor uwu`,
        ok: true
    })
});

// Defining routes for my express app
app.use(productRoutes);
app.use(userRoutes);
app.use(orderRoutes);

module.exports = app;