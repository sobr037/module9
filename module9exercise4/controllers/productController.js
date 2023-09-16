const https = require("https");

// Function to fetch products from the API
const fetchProducts = (req, res) => {
  const apiUrl = "https://fakestoreapi.com/products";

  https.get(apiUrl, (response) => {
    let data = "";

    response.on("data", (chunk) => {
      data += chunk;
    });

    response.on("end", () => {
      try {
        const products = JSON.parse(data);
        res.json(products);
      } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
      }
    });
  }).on("error", (error) => {
    res.status(500).json({ error: "Internal Server Error" });
  });
};

// Function to fetch a single product by ID
const fetchProductById = (req, res) => {
  const productId = req.params.id;
  const apiUrl = `https://fakestoreapi.com/products/${productId}`;

  https.get(apiUrl, (response) => {
    let data = "";

    response.on("data", (chunk) => {
      data += chunk;
    });

    response.on("end", () => {
      try {
        const product = JSON.parse(data);
        res.json(product);
      } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
      }
    });
  }).on("error", (error) => {
    res.status(500).json({ error: "Internal Server Error" });
  });
};

module.exports = {
  fetchProducts,
  fetchProductById,
};
