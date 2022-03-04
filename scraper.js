// const Scraper = require('images-scraper');
const { workerData, parentPort } = require('worker_threads')

// const google = new Scraper({
//     puppeteer: {
//         headless: false,
//     },
// });


// (async () => {
//     console.log(workerData);
//     google.scrape(String(workerData), 1).then(data =>{
//         parentPort.postMessage(data[0])
//     })
// })();



// console.log(true);
//
const puppeteer = require('puppeteer');
// const { workerData, parentPort } = require('worker_threads')




(async () => {
    console.log(workerData);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://yandex.ru/images/search?text=${workerData}`);
    // await page.screenshot({ path: 'example.png' });
    const url = await page.evaluate(() => {
        const body = document.getElementsByClassName("serp-controller__content")[0];
        const img = body.getElementsByTagName("img")[0]
        return img.src;
    });
    await browser.close();
    parentPort.postMessage({url})
})();
