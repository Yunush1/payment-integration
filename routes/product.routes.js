const express = require('express');
const {createProducts, getProducts} = require("../payment_service/products.controller");
const auth = require("../middleware/jwttoken");
const router = express.Router();


router.post('/products', createProducts);
router.get('/products', getProducts);

module.exports= router ;
