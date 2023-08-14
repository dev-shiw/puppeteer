// test puppeteer using core/normal plugin

const puppeteer = require("puppeteer");
(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.goto("https://bot.sannysoft.com/");
  await page.screenshot({path:"bot.jpg", fullPage:true});

  await browser.close();
})();
