import puppeteer from 'puppeteer';

describe('show/hide an event details', () => {
  jest.setTimeout(30000);
  let browser;
  let page;
  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 250,
      ignoreDefaultArgs: ['--disable-extensions'] 
    });
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.Event');
  });

  afterAll(() => {
    browser.close();
  });

  test('An event element is collapsed by default', async () => {
    const eventDetails = await page.$('.Event .event_Details');
    expect(eventDetails).toBeNull();
  });

  test('User can expand an event to see its details', async () => {
    await page.click('.Event .detailsBtn');
    const eventDetails = await page.$('.Event .event_Details');
    expect(eventDetails).toBeDefined();
  });

  test('User can collapse an event to hide its details', async () => {
    await page.click('.Event .detailsBtn');
    const eventDetails = await page.$('.Event .event_details');
    expect(eventDetails).toBeNull();
  });

});