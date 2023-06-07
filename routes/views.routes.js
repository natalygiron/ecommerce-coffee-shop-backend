const express = require('express')
const router = express.Router();


router.get('/api/product', (req, res) => res.render('pages/product'))

router.get('/api/contact', (req, res) => res.render('pages/contact'));

// router.get('/api/products', (req, res) => res.render('pages/product'));

router.get('/api/home', (req, res) => res.render('index'));

router.get('/api/about-us', (req, res) => res.render('pages/about-us'));

router.get('/api/login', (req, res) => res.render('pages/login'));

router.get('/api/register', (req, res) => res.render('pages/register'));

router.get('/api/cart', (req, res) => res.render('pages/cart'));

router.get('/api/admin-product', (req, res) => res.render('admin/admin-product'));

router.get('/api/admin-user', (req, res) => res.render('admin/admin-user'));

router.get('/api/order', (req, res) => res.render('pages/register'));

module.exports = router;