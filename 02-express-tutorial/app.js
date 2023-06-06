const express = require("express");
const { products } = require("./data");

const app = express();

app.get("/api/product/:productID", (req, res) => {
  const productID = req.params.productID;
  const singleProduct = products.find((product) => product.id === +productID);

  if (!singleProduct) {
    return res.status(404).json("Not found product");
  }

  res.json(singleProduct);
});

app.get("/api/v1/query", (req, res) => {
  console.log(req.query);

  res.json("Hello World");
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000...");
});
