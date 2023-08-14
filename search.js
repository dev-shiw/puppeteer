const puppeteer = require("puppeteer");

// 1. click on search icon
// 2. search key term
// 3. press enter
// 4. click on the first search result
// 5. wait for the new article to load
// 6. output the text on the terminal

const keyword = "technology";

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("https://forbes.com/", { waitUntil: 'domcontentloaded' });
    try {
        await page.waitForSelector('.search-modal__submit');
        await page.click('button.icon--search')
        await page.type('input.search-modal__input', keyword, { delay: 100 });
        await page.keyboard.press('Enter');
        await new Promise((r) => setTimeout(r, 3000));
        await page.click('a.stream-item__title');
        await new Promise((r) => setTimeout(r,3000));
        const textscrape = await page.evaluate(() => {
            const data = Array.from(document.querySelectorAll("p")).map((a) =>
              a.innerText.trim()
            );
            return data;
          });
          console.log({ textscrape });

    } catch (error) {
        console.error("An error occurred:", error);
    } finally {
        await browser.close();
    }
})();
