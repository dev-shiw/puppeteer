const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const XLSX = require("xlsx");
const fs = require("fs");
const { writeFile } = require("fs");

puppeteer.use(StealthPlugin());

async function scrapefunc() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("https://forbes.com/", { waitUntil: "domcontentloaded" });
  try {
    await page.click(".card--large__title");
    await new Promise((r) => setTimeout(r, 3000));
    const textscrape = await page.evaluate(() => {
      const data = Array.from(document.querySelectorAll("p")).map((a) =>
        a.innerText.trim()
      );
      return data;
    });
    console.log({ textscrape });
    return textscrape;
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    await browser.close();
  }
}
function saveToExcelFile(textscrape) {
  let data = textscrape.map((text) => ({
    Text: text,
  }));
  data = data.filter((val) => val.Text != "");
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Scrape");
  XLSX.writeFile(workbook, "stealthscrape.xlsx");
}
function saveToTextFile(textscrape) {
  const content = textscrape.join("\n");

  fs.writeFileSync("stealthscrape.txt", content, "utf-8");
}
function jsonToFile(textscrape) {
  writeFile(
    "stealthscrape.json",
    JSON.stringify(textscrape),
    "utf-8",
    (err) => {
      if (err) throw err;
      // console.log('saved the file');
    }
  );
}
scrapefunc()
  .then((data) => {
    saveToExcelFile(data);
    saveToTextFile(data);
    jsonToFile(data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
