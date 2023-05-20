const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

// Obtener todos los productos
router.get("/products", productController.getAllProducts);

// Obtener producto por id
router.get("/product/:id", productController.getProduct);

// Añadir un producto
router.post("/product", productController.addProduct);

// Eliminar un producto
router.delete("/product/:id", productController.deleteProduct);

// Modificar producto por id
router.patch("/product/:id", productController.updateProduct);

module.exports = router;