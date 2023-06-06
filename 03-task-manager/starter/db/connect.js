import mongoose from "mongoose";

const connectionString =
  "mongodb+srv://tuan:1234@nodeexpressprojects.pmls4dc.mongodb.net/03-TASK-MANAGER";

const connectDB = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  });
};

export { connectDB };
