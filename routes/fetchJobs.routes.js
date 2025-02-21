import express from "express";
import { getFloRecruitJobs, getSaviyntJobs, scrapeOrionJobs } from "../controller/scrapJobs.controller.js";

const router = express.Router();

router.get("/get-orion-jobs", scrapeOrionJobs);
router.get("/get-saviynt-jobs", getSaviyntJobs);
router.get("/get-florecruit-jobs", getFloRecruitJobs)

export default router;
