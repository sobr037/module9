const express = require("express");
require("dotenv").config();
const dbConnect = require("./dbConnect");
const app = express();

// Parse requests of content-type - application/json
app.use(express.json());

// Define your userRoutes before other routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const postRoutes = require('./routes/postRoutes');
app.use('/api/posts', postRoutes);


app.get("/", (req, res) => {
  res.json({ message: "Welcome to my SQL application." });
});

// Set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
