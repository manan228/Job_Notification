import express from "express";
import scrapeOrionJobs from "../controller/scrapJobs.controller.js";

const router = express.Router();

router.get("/get-orion-jobs", scrapeOrionJobs);

export default router;
