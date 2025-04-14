import express from "express";
import { getFloRecruitJobs, getSaviyntJobs, scrapeOrionJobs } from "../controller/scrapJobs.controller.js";
import { removeJob } from "../controller/removeJobs.controller.js";

const router = express.Router();

router.get("/get-orion-jobs", scrapeOrionJobs);
router.get("/get-saviynt-jobs", getSaviyntJobs);
router.get("/get-florecruit-jobs", getFloRecruitJobs)
router.get("/remove-job", removeJob)

export default router;
