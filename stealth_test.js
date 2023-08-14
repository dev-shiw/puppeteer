// test stealth (to avoid getting detected as a bot)
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
puppeteer.use(StealthPlugin())
puppeteer.use(AdblockerPlugin({ blockTrackers: true }))

puppeteer.launch({ headless: 'new' }).then(async browser => {
    const page = await browser.newPage()
  
    await page.goto('https://www.vanityfair.com')
    await page.waitForTimeout(1000)
    await page.screenshot({ path: 'adblocker.png', fullPage: true })
  
    await page.goto('https://bot.sannysoft.com')
    await page.waitForTimeout(5000)
    await page.screenshot({ path: 'stealth.png', fullPage: true })
  
    await browser.close()
  })