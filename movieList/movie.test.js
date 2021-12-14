const {Builder, Capabilities, By} = require('selenium-webdriver');

require('chromedriver');

const driver = new Builder().withCapabilities(Capabilities.chrome()).build();

beforeAll(async () => {
    await driver.get('http://127.0.0.1:5501/movieList/index.html');
});

afterAll(async () => {
    await driver.quit();
});

test('Can delete a movie entry', async () => {
    let test = 'test movie';
    await driver.findElement(By.xpath('//input')).sendKeys(test);
    await driver.findElement(By.xpath('//button')).click();
    await driver.findElement(By.xpath('//li/button')).click();

    let isPresent;
    await driver.findElements(By.xpath('//li')).then(elements => isPresent = (elements.length > 0))
    expect(isPresent).toBeFalsy();
});

test('Can delete multiple movie entries', async () => {
    let test = 'test movie';
    await driver.findElement(By.xpath('//input')).sendKeys(test);
    await driver.findElement(By.xpath('//button')).click();
    await driver.findElement(By.xpath('//input')).sendKeys(test);
    await driver.findElement(By.xpath('//button')).click();
    await driver.findElement(By.xpath('//input')).sendKeys(test);
    await driver.findElement(By.xpath('//button')).click();
    
    await driver.findElement(By.xpath('//li/button')).click();
    await driver.findElement(By.xpath('//li/button')).click();
    await driver.findElement(By.xpath('//li/button')).click();
    
    let isPresent;
    await driver.findElements(By.xpath('//li')).then(elements => isPresent = (elements.length > 0))
    expect(isPresent).toBeFalsy();
});

test('The notification text updates', async () => {
    let test = 'test movie';
    await driver.findElement(By.xpath('//input')).sendKeys(test);
    await driver.findElement(By.xpath('//button')).click();
    await driver.findElement(By.xpath('//li/button')).click();

    const notification = await driver.findElement(By.xpath('//aside')).getText();
    expect(notification).toBe('test movie deleted!');
});