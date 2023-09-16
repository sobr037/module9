const express = require("express");
const app = express();
require("dotenv").config();

const productRoute = require("./routes/productRoute"); // Import your productRoute module

// parse requests of content-type - application/json
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to my application. This is an example of incorporating a third party microservice into the application. Visiting /api/products will return full list of products and /api/products/number will return a product by its ID." });
});

// Define routes for products
app.use("/api/products", productRoute);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
