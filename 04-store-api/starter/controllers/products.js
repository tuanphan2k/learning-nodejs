import { productModel } from "../models/product.js";

const getAllProductsStatic = async (req, res) => {
  const products = await productModel.find({});

  res.status(200).json({
    status: "success",
    data: {
      products,
      nbHits: products.length,
    },
  });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort } = req.query;

  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }

  if (company) {
    queryObject.company = company;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  let result = productModel.find(queryObject);

  if (sort) {
    const sortList = sort.split(",").join(" ");

    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  const products = await result;

  res.status(200).json({
    status: "success",
    data: {
      products,
      nbHits: products.length,
    },
  });
};

export { getAllProducts, getAllProductsStatic };
