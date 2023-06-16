import dotenv from "dotenv";
import connectDB from "./db/connect.js";
import { productModel } from "./models/product.js";
import jsonProducts from "./products.json" assert { type: "json" };

dotenv.config();

const start = async (req, res) => {
  try {
    await connectDB(process.env.MONGO_URI);
    await productModel.deleteMany();
    await productModel.create(jsonProducts);
    process.exit(0);
  } catch (error) {
    consnole.log(error);
    process.exit(1);
  }
};

start();
