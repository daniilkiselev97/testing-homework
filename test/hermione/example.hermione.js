const { assert } = require('chai');

const assertOptions = {
    screenshotDelay : 100,
    captureElementFromTop : true
}

// describe('microsoft', async function() {
//     it('Тест, который пройдет', async function() {
//         await this.browser.url('https://www.microsoft.com/ru-ru/');
//         await this.browser.assertView('plain', 'body');

//         const title = await this.browser.$('#uhfLogo').getText();
//         assert.equal(title, 'Microsoft');
//     });
// });

// describe('Конвертор валют', ()=>{
//     it('должен появиться на странице', async({browser})=>{
//         const puppeteer = await browser.getPuppeteer(); //отключение через фрэйм и удобно по этому протоколу взаимод с браузером
//         const [page] = await puppeteer.pages() //выбираем первую вкладку

//         await page.goto('http://localhost:3000/hw/store/') //совершаем переход на сайт
//         await page.keyboard.type('Курс доллара к рублю') //в элементе который в фокусе вводим
//         await page.keyboard.press('Enter')
//         // await browser.pause(1000) //ожидаем прогрузки

//         // const selector = await page.$('.Convertor') //дергаем селектор
//         // assert.ok(selector, 'Конвертор валют не появился')

//         await page.waitForSelector('.Convertor',{timeout:5000}) //ждем выполнение определенного селектора
//         await browser.asserView('plain', '.Convertor') //, {ignoreElements: [css Selectors]}
//     })
// })
describe('Страницы', () => {
    it('в магазине должны быть страницы: главная, каталог, условия доставки, контакты', async({browser})=>{
        await browser.url('http://localhost:3000/hw/store/')
        const mainText = await browser.$('[data-testid="page-name"]').getText()
        assert.equal(mainText, 'Welcome to Example store!');

        await browser.url('http://localhost:3000/hw/store/catalog')
        const catalogText = await browser.$('[data-testid="page-name"]').getText()
        assert.equal(catalogText, 'Catalog');

        await browser.url('http://localhost:3000/hw/store/delivery')
        const deliveryText = await browser.$('[data-testid="page-name"]').getText()
        assert.equal(deliveryText, 'Delivery');

        await browser.url('http://localhost:3000/hw/store/contacts')
        const contactsText = await browser.$('[data-testid="page-name"]').getText()
        assert.equal(contactsText, 'Contacts');

    })
    it('страницы главная, условия доставки, контакты должны иметь статическое содержимое', async ({
        browser,
    }) => {

        const puppeteer = await browser.getPuppeteer(); //отключение через фрэйм и удобно по этому протоколу взаимод с браузером
        const [page] = await puppeteer.pages() //выбираем первую вкладку

        await page.goto('http://localhost:3000/hw/store/'); //совершаем переход на сайт
        await page.waitForSelector('[data-page="main-page-wrap"]',{timeout:5000}); //, {ignoreElements: [css Selectors]}
        await browser.assertView('home', '[data-page="main-page-wrap"]', assertOptions)

        await page.goto('http://localhost:3000/hw/store/delivery/'); 
        await page.waitForSelector('[data-page="delivery-page-wrap"]',{timeout:5000}); 
        await browser.assertView('delivery', '[data-page="delivery-page-wrap"]', assertOptions)

        await page.goto('http://localhost:3000/hw/store/contacts/'); 
        await page.waitForSelector('[data-page="contacts-page-wrap"]',{timeout:5000}); 
        await browser.assertView('contacts', '[data-page="contacts-page-wrap"]', assertOptions)


    });
});

decribe
