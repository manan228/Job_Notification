import chrome from "selenium-webdriver/chrome.js";
import { Builder } from "selenium-webdriver";

function initDriver() {
  const options = new chrome.Options();
  options.addArguments("--headless"); // Run in headless mode
  options.addArguments("--no-sandbox");
  options.addArguments("--disable-gpu");

  return new Builder().forBrowser("chrome").setChromeOptions(options).build();
}

export default initDriver;
