const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
require("dotenv").config();
async function main() {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("https://accounts.craigslist.org/login");
    await page.type("input#inputEmailHandle", process.env.EMAIL_ADDRESS);
    await page.type("input#inputPassword", process.env.PASSWORD);
    await page.click("button#login");
    await page.waitForNavigation();
    await page.goto(
      "https://accounts.craigslist.org/login/home?show_tab=drafts"
    );

    const content = await page.content();
    const $ = await cheerio.load(content);
    const drafts = $(".homepage_label").find("b").text();
    console.log(drafts);
  } catch (error) {
    console.error(error);
  }
}

main();
