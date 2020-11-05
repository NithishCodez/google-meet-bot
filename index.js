const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())
const art = require('figlet');
const config = require('./config.js');
(async () => {
  console.log(ms(config.EndTime))

  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()

  const navigationPromise = page.waitForNavigation();

  await art('Made By Nithish', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
});

await wait(5000)

  console.log('Going to accounts.google.com...')
  await page.goto('https://accounts.google.com/')

  await navigationPromise


  await page.waitForSelector('input[type="email"]')
  await page.click('input[type="email"]')

  await navigationPromise

  console.log('Typing in email...')
  await page.type('input[type="email"]', config.Email)

  await page.waitForSelector('#identifierNext')
  await page.click('#identifierNext')
   await wait(5000)

  await page.waitForSelector('input[type="password"]')
  await page.click('input[type="password"]')

  console.log('Typing in password...')
  await page.type('input[type="password"]', config.Password)

  await page.waitForSelector('#passwordNext')
  await page.click('#passwordNext')

  await page.waitForNavigation({
    waitUntil: 'networkidle0',
  });

  console.log('Logged in to google successfully...')

  const meetPage = await browser.newPage()
  console.log('Going to meet.google.com...')
  await meetPage.goto('https://meet.google.com/')
  await meetPage.click('input[class="VfPpkd-fmcmS-wGMbrd B5oKfd"]')
  console.log('Entering meet link...')
  await meetPage.type('input[type="text"]', config.MeetLink)
  console.log('Waiting for 3sec...')
  await wait(3000)
  console.log('Clicking join button...')
  await meetPage.click('#yDmH0d > c-wiz > div > div.S3RDod > div > div.Qcuypc > div.Ez8Iud > div.KOM0mb > div.VfPpkd-dgl2Hf-ppHlrf-sM5MNb > button')
  console.log('Clicked join button...')
  console.log('Waiting for 2sec...')
  await wait(2000)
  console.log('Waiting for 10sec to check if the meeting has Ask to join enabled...')
  await wait(10000)
  const element = await meetPage.$('span[class="NPEfkd RveJvd snByac"]');
  const text = await (await element.getProperty('textContent')).jsonValue();
  if(text === "Ask to join"){
  console.log('Ask to join detected...');
  await wait(2000)
  console.log('Clicking ask to join button...')
  await meetPage.click('div[class="e19J0b CeoRYc"]');
  console.log('Clicked Ask to join button...');
  await wait(1000)
  console.log('If join request is accepted, The meething will be left in 5min from now')
  await art('Subscribe', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
});
console.log('Subscribe To Coding With Nithish For More OpenSource Projects :\n https://www.youtube.com/channel/UC_M6GWo7ZcmUVzssGi7i5Iw')
console.log('Leaving the meeting in: ' + ms(config.EndTime))

  }else{
    console.log('Ask to join not enabled...')
    await wait(2000)
    await meetPage.click('div[class="e19J0b CeoRYc"]');
    console.log('Joined class successfully...')
    await art('Subscribe', function(err, data) {
      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
      }
      console.log(data)
  });
  console.log('Subscribe To Coding With Nithish For More OpenSource Projects : https://www.youtube.com/channel/UC_M6GWo7ZcmUVzssGi7i5Iw')
  console.log('Leaving the meeting in: ' + ms(config.EndTime))
  }

  setTimeout(async () => {
    await meetPage.goBack()
    console.log('LEFT THE MEETING SUCCESSFULYL!') 
    await art('Subscribe', function(err, data) {
      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
      }
      console.log(data)
  });
  console.log('Subscribe To Coding With Nithish For More OpenSource Projects : https://www.youtube.com/channel/UC_M6GWo7ZcmUVzssGi7i5Iw')
    console.log('Closing browser in 10sec')
    await wait(10000)
    await browser.close()
  }, config.EndTime)
})()

function ms(s) {

  function pad(n, z) {
    z = z || 2;
    return ('00' + n).slice(-z);
  }

  var ms = s % 1000;
  s = (s - ms) / 1000;
  var secs = s % 60;
  s = (s - secs) / 60;
  var mins = s % 60;
  var hrs = (s - mins) / 60;

  return pad(hrs) + ' hrs ' + pad(mins) + ' min ' + pad(secs) + ' sec ' + pad(ms, 3) + ' ms '
}
