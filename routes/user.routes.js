const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const {jwtVerify} = require('../middlewares/isAuth')

// Obtener todos los usuarios
router.get("/users", userController.getAllUsers);

// Obtener usuario por id
router.get("/user/:id",jwtVerify, userController.getUserById);

// Agregar un usuario
router.post("/user", userController.createUser);

// Eliminar un usuario
router.delete("/user/:id", userController.deleteUserById);

// Modificar usuario por id
router.patch("/user/:id", userController.updateUserById);

// Login
router.post("/user/login", userController.loginUser);

module.exports = router;