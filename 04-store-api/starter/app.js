import dotenv from "dotenv";
import express from "express";
import 'express-async-errors';

import { default as productsRouter } from "./routes/products.js";

import notfoundMiddleware from "./middleware/not-found.js";
import erorrMiddleware from "./middleware/error-handler.js";
import connectDB from "./db/connect.js";

dotenv.config();

const app = express();

//middleware
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("<h1>Store API</h1>");
});

app.use("/api/v1/products", productsRouter);

//products store
app.use(notfoundMiddleware);
app.use(erorrMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
