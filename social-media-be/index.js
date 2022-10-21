import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import AuthRoute from "./Routes/AuthRoute.js";
import UserRoute from "./Routes/UserRoute.js";
import PostRoute from "./Routes/PostRoute.js";
import UploadRoute from "./Routes/UploadRoute.js";

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// to serve images inside public folder
// app.use(express.
// static("public"));
// app.use("/images", express.static("images"));

dotenv.config();
// const PORT = process.env.PORT;
// const CONNECTION = process.env.MONGODB_CONNECTION;

mongoose
  .connect(process.env.MONGO_DB)
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log("Connected to DB in port", process.env.PORT)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));

// mongoose
//   .connect(CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => app.listen(PORT, () => console.log(`Listening at Port ${PORT}`)))
//   .catch((error) => console.log(`${error} did not connect`));

app.use("/auth", AuthRoute);
app.use("/user", UserRoute);
app.use("/post", PostRoute);
app.use("/upload", UploadRoute);
