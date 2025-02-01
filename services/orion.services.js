import { By, until } from "selenium-webdriver";

const extractOrionJobs = async (driver) => {
  console.log(`jobs extraction in progress`);
  let jobsData = [];
  let jobs = await driver.findElements(By.className("teaser-search"));

  for (let job of jobs) {
    let titleElem = await job.findElement(By.className("article-title"));
    let categoryElem = await job.findElement(By.className("category"));

    let title = await titleElem.getText();
    let link = await titleElem.getAttribute("href");
    let category = (await categoryElem.getText())
      .replace("Category:", "")
      .trim();

    jobsData.push({ title, link, category });
  }

  console.log(`jobs extraction done`);

  return jobsData;
};

const handleCookiePopup = async (driver) => {
  try {
    let declineButton = await driver.wait(
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
