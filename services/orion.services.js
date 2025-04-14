import { By, until } from "selenium-webdriver";
import Orion from "../models/orion.model.js";

const extractOrionJobs = async (driver) => {
  console.log(`jobs extraction in progress`);
  const jobsData = [];
  const jobs = await driver.findElements(By.className("teaser-search"));

  for (let job of jobs) {
    const titleElem = await job.findElement(By.className("article-title"));

    const idAttr = await job.getAttribute("id");
    const id = idAttr.match(/\d+/)?.[0];
    const title = await titleElem.getText();
    const link = await titleElem.getAttribute("href");

    const jobData = { id, title, link };

    const existingJob = await saveOrionJobToMongo(jobData);

    if (existingJob.flag) jobsData.push(existingJob);
  }

  jobsData.sort((a, b) => b.id - a.id);

  console.log(`jobs extraction done`);
  return jobsData;
};

const saveOrionJobToMongo = async (jobData) => {
  try {
    let existingJob = await Orion.findOne({ id: jobData.id }).lean();

    if (!existingJob) existingJob = await Orion.create(jobData).toObject();

    return existingJob;
  } catch (err) {
    console.log(err);
  }
};

const handleCookiePopup = async (driver) => {
  try {
    const declineButton = await driver.wait(
      until.elementLocated(By.id("hs-eu-decline-button")),
      5000
    );

    await declineButton.click();
    console.log("Cookie popup dismissed.");
  } catch (error) {
    console.log("No cookie popup found.");
  }
};

async function loadAllJobs(driver) {
  try {
    while (true) {
      const loadMoreButtons = await driver.findElements(By.id("load-more"));

      if (loadMoreButtons.length > 0) {
        await loadMoreButtons[0].click();
        console.log("Load more button clicked.");
        await driver.sleep(3000);
      } else {
        console.log("No more 'Load More' button found. Exiting.");
        break;
      }
    }
  } catch (error) {
    console.error("Error occurred while attempting to load jobs:", error);
  }

  console.log("All jobs have been loaded or no more 'Load More' buttons.");
}

export { loadAllJobs, handleCookiePopup, extractOrionJobs };
