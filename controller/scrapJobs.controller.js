import axios from "axios";
import { FLO_RECRUIT_URL, FROM_MAIL, ORION_URL, SAVIYNT_URL, TO_MAIL } from "../constants.js";
import {
  extractOrionJobs,
  handleCookiePopup,
  loadAllJobs,
} from "../services/orion.services.js";
import initDriver from "../utils/initChromeDriver.js";
import sendEmail from "../utils/sendEmail.js";
import { filterSaviyntJobs } from "../services/saviynt.services.js";
import { filterFloRecruitJobs } from "../services/floRecruit.services.js";

async function getSaviyntJobs(req, res) {
  try {
    const { data } = await axios.get(SAVIYNT_URL);

    const filteredJobs = await filterSaviyntJobs(data);
    if(filteredJobs.length === 0) return res.json({ message: "No jobs found" });

    const mailObj = {
      to: TO_MAIL,
      from: FROM_MAIL,
      templateId: "d-ee323574aeac44049157c50cfe6bf5e9",
      dynamic_template_data: { filteredJobs },
    };

    await sendEmail(mailObj);

    res.json(filteredJobs);
  } catch (err) {
    console.error("Error fetching or processing jobs:", err.message);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
}

async function scrapeOrionJobs(req, res) {
  try {
    const driver = initDriver();

    await driver.get(ORION_URL);

    handleCookiePopup(driver);

    await loadAllJobs(driver);

    const jobsData = await extractOrionJobs(driver);
    if(jobsData.length === 0) return res.json({ message: "No jobs found" });

    const mailObj = {
      to: TO_MAIL,
      from: FROM_MAIL,
      templateId: "d-2891c6a8a72d4a83857fd36807b8841e",
      dynamicTemplateData: { jobs: jobsData },
    };

    await sendEmail(mailObj);

    driver.quit();

    res.status(200).json(jobsData);
  } catch (error) {
    console.error("Error scraping jobs:", error);
    return { error: "Failed to scrape jobs" };
  }
}

async function getFloRecruitJobs(req, res) {
  try {
    const { data } = await axios.get(FLO_RECRUIT_URL);

    const filteredJobs = await filterFloRecruitJobs(data);
    if(filteredJobs.length === 0) return res.json({ message: "No jobs found" });

    const mailObj = {
      to: TO_MAIL,
      from: FROM_MAIL,
      templateId: "d-34f7a71433e5415f87f10e2136a13088",
      dynamic_template_data: { jobs: filteredJobs },
    };

    await sendEmail(mailObj);

    res.json(filteredJobs);
  } catch (err) {
    console.error("Error fetching or processing jobs:", err.message);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
}

export { scrapeOrionJobs, getSaviyntJobs, getFloRecruitJobs };
