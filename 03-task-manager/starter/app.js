import express from "express";
import dotenv from "dotenv";
import { default as tasks } from "./routes/tasks.js";
import { connectDB } from "./db/connect.js";
import notFound from "./middleware/not-found.js";
import { errorHandlerMiddleware } from "./middleware/error-handler.js";

dotenv.config();

const app = express();

//middleware
app.use(express.static("./public"));
app.use(express.json());

//routes
app.use("/api/v1/tasks", tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(
      process.env.PORT,
      console.log(`Server is listening on port ${process.env.PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
