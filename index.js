import express from "express";
import mongoose from "mongoose";
import jobRoute from "./routes/fetchJobs.routes.js";
import config from "./config/config.js";

const app = express();

app.use("/", jobRoute);

async function dbConnect() {
  await mongoose.connect(config.MONGO_URL);
  console.log(`mongoose DB connected`);
}

dbConnect();

app.listen(config.port, () =>
  console.log(`Server running in ${config.env} mode on port ${config.port}`)
);
