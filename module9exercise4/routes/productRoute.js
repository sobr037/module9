const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Define routes
router.get("/", productController.fetchProducts);
router.get("/:id", productController.fetchProductById);

module.exports = router;
