const express = require("express");
let dbConnect = require("./dbConnect");
const app = express();
require("dotenv").config();

// Parse requests of content-type - application/json
app.use(express.json());

// Define your userRoutes before other routes
let userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Define your postRoutes
const postRoutes = require('./routes/postRoutes');
app.use('/api/posts', postRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to my MongoDB application." });
});

// Set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
