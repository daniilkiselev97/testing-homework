const { assert } = require('chai');

describe('microsoft', async function() {
    it('Тест, который пройдет', async function() {
        await this.browser.url('https://www.microsoft.com/ru-ru/');
        await this.browser.assertView('plain', 'body');

        const title = await this.browser.$('#uhfLogo').getText();
        assert.equal(title, 'Microsoft');
    });
});


// describe('Конвертор валют', ()=>{
//     it('должен появиться на странице', async({browser})=>{
//         const puppeteer = await browser.getPuppeteer(); //отключение через фрэйм и удобно по этому протоколу взаимод с браузером
//         const [page] = await puppeteer.pages() //выбираем первую вкладку

//         await page.goto('https://ya.ru') //совершаем переход на сайт
//         await page.keyboard.type('Курс доллара к рублю') //в элементе который в фокусе вводим
//         await page.keyboard.press('Enter')
//         // await browser.pause(1000) //ожидаем прогрузки

//         // const selector = await page.$('.Convertor') //дергаем селектор 
//         // assert.ok(selector, 'Конвертор валют не появился')

//         await page.waitForSelector('.Convertor',{timeout:5000}) //ждем выполнение определенного селектора
//         await browser.asserView('plain', '.Convertor') //, {ignoreElements: [css Selectors]}
//     })
// })