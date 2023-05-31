const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const {authorization} = require('../middlewares/isAdmin');

// Obtener todos los productos
router.get("/products", authorization(['customer','admin']), productController.getAllProducts);

// Obtener producto por id
router.get("/product/:id", authorization(['customer','admin']), productController.getProduct);

// Añadir un producto
router.post("/product", authorization(['admin']),productController.addProduct);

// Eliminar un producto
router.delete("/product/:id", authorization(['admin']), productController.deleteProduct);

// Modificar producto por id
router.patch("/product/:id", authorization(['admin']), productController.updateProduct);

module.exports = router;