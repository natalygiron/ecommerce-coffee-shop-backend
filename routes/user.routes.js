const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const {jwtVerify} = require('../middlewares/isAuth');
const {authorization} = require('../middlewares/isAdmin');

// Obtener todos los usuarios
router.get("/users", authorization(['admin']), userController.getAllUsers);

// router.post("/user/logout", authorization(['customer','admin']), userController.logout);

// Obtener usuario por id
router.get("/user/:id",authorization(['customer','admin']), jwtVerify, userController.getUserById);

// Agregar un usuario
router.post("/user", userController.createUser);

// Eliminar un usuario
router.delete("/user/:id", authorization(['admin']), userController.deleteUserById);

// Modificar usuario por id
router.patch("/user/:id", authorization(['admin']), userController.updateUserById);

// Login
router.post("/user/login", authorization(['customer','admin']), userController.loginUser);

module.exports = router;