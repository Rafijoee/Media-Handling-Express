require('dotenv').config();


const express = require("express");
const router = express.Router();
const app = express();
const port = process.env.PORT || 3000;
const routes = require("./routes/index");

app.use('/images', express.static('public/images'));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/v1", routes);

app.listen(3000, () => {
  console.log(`Server is running on port ${port}`);
});

