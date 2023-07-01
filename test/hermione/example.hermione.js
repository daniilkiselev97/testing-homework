const { assert } = require('chai');

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
describe('Конвертор валют', ()=>{
    it('в магазине должны быть страницы: главная, каталог, условия доставки, контакты', async({browser})=>{
        // const puppeteer = await browser.getPuppeteer(); //отключение через фрэйм и удобно по этому протоколу взаимод с браузером
        // const [page] = await puppeteer.pages() //выбираем первую вкладку
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
})