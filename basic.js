// some of the basic things that could be done using puppeteer.
// opening a headless browser
// taking a screenshot
// getting url of the website

const puppeteer = require("puppeteer");
(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("https://forbes.com/",{ waitUntil: 'domcontentloaded' });
  
  const url =await page.url()
  console.log({"url":url})
  await page.waitForSelector(".channel__column")
  await page.screenshot({path:"forbes.jpg", fullPage:true});
  console.log("screenshot saved to forbes.jpg")
  const content=await page.content();
  console.log(content)
  await browser.close();
})();
