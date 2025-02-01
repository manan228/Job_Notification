import express from "express";
import { Builder, By, until } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";
import sgMail from "@sendgrid/mail";
import "dotenv/config";
import jobRoute from "./routes/fetchJobs.routes.js";

const app = express();

app.use("/", jobRoute);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Set SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// async function initDriver() {
//   const options = new chrome.Options();
//   options.addArguments("--headless"); // Run in headless mode
//   options.addArguments("--no-sandbox");
//   options.addArguments("--disable-gpu");

//   return new Builder().forBrowser("chrome").setChromeOptions(options).build();
// }

// async function scrapeJobs() {
//   const driver = await initDriver();
//   const url =
//     "https://www.orioninc.com/careers/jobs/?keyword=&_job_category=technology-and-engineering&_job_location=north-america";

//   try {
//     await driver.get(url);

//     // Handle Cookie Popup
//     try {
//       let declineButton = await driver.wait(
//         until.elementLocated(By.id("hs-eu-decline-button")),
//         5000
//       );
//       await declineButton.click();
//       console.log("Cookie popup dismissed.");
//     } catch (error) {
//       console.log("No cookie popup found.");
//     }

//     // Function to load all jobs
//     async function loadAllJobs() {
//       while (true) {
//         try {
//           let loadMoreButton = await driver.wait(
//             until.elementLocated(By.id("load-more")),
//             5000
//           );
//           await loadMoreButton.click();
//           console.log("Load more button clicked.");
//           await driver.sleep(3000);
//         } catch (error) {
//           console.log("No more 'Load More' button found.");
//           break;
//         }
//       }
//     }

//     await loadAllJobs();

//     // Extract job details
//     let jobsData = [];
//     let jobs = await driver.findElements(By.className("teaser-search"));

//     for (let job of jobs) {
//       let titleElem = await job.findElement(By.className("article-title"));
//       let categoryElem = await job.findElement(By.className("category"));

//       let title = await titleElem.getText();
//       let link = await titleElem.getAttribute("href");
//       let category = (await categoryElem.getText())
//         .replace("Category:", "")
//         .trim();

//       jobsData.push({ title, link, category });
//     }

//     // Send email with job listings
//     const msg = {
//       to: "manan228@gmail.com",
//       from: "manan228@gmail.com",
//       templateId: "d-2891c6a8a72d4a83857fd36807b8841e",
//       dynamicTemplateData: { jobs: jobsData },
//     };

//     try {
//       await sgMail.send(msg);
//       console.log("Email sent successfully.");
//     } catch (emailError) {
//       console.error(
//         "Error sending email:",
//         emailError.response ? emailError.response.body : emailError
//       );
//     }

//     return jobsData;
//   } catch (error) {
//     console.error("Error scraping jobs:", error);
//     return { error: "Failed to scrape jobs" };
//   } finally {
//     await driver.quit();
//   }
// }
