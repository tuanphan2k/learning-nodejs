import express from "express";
import { default as tasks } from "./routes/tasks.js";
import { connectDB } from "./db/connect.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

//middleware
app.use(express.static('./public'))
app.use(express.json());

//routes
app.use("/api/v1/tasks", tasks);

const port = 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
