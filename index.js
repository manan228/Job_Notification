import express from "express";
import "dotenv/config";
import jobRoute from "./routes/fetchJobs.routes.js";
import { initialSetup } from "./utils/setSendgridAPIKey.js";

const app = express();
initialSetup();

app.use("/", jobRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
