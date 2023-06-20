import jwt from "jsonwebtoken";
import { Unauthenticated } from "../errors/index.js";

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Unauthenticated("No token provided");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded", decoded);
    const { id, username } = decoded;
    req.user = { id, username };
    next();
  } catch (error) {
    throw new Unauthenticated("Not authorized to access this route");
  }
};

export default authenticationMiddleware;
