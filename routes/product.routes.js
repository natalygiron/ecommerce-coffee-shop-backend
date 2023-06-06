const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const uploadController = require('../controllers/upload.controller');
const {authorization} = require('../middlewares/isAdmin');

// Obtener todos los productos
router.get("/products", productController.getAllProducts);

// Obtener producto por id
router.get("/product/:id", productController.getProduct);

// Añadir un producto
router.post("/product", authorization(['admin']), uploadController.uploadProduct, productController.addProduct);

// Eliminar un producto
router.delete("/product/:id", authorization(['admin']), productController.deleteProduct);

// Modificar producto por id
router.patch("/product/:id", authorization(['admin']), productController.updateProduct);

module.exports = router;