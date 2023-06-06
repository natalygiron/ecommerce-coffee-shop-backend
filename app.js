const express = require('express');
const app = express();
const productRoutes = require('./routes/product.routes.js');
const userRoutes = require('./routes/user.routes.js');
const orderRoutes = require('./routes/order.routes.js');
const uploadRoutes = require('./routes/upload.routes.js');
const viewsRoutes = require('./routes/views.routes.js');

// middlewares
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get("/api/", (request, response) => {
    response.send({
        msg: `Bienvenidas/os a mi servidor uwu`,
        ok: true
    })
});

app.use(viewsRoutes);


// Defining routes for my express app
// app.use('/api', [
//     productRoutes,
//     userRoutes,
//     orderRoutes,
//     uploadRoutes
// ]);


app.use(productRoutes);
app.use(userRoutes);
app.use(orderRoutes);
app.use(uploadRoutes);



module.exports = app;