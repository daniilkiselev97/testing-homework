const { assert } = require('chai');

const mockRequest = (request) => {
    // console.log('on request', request.url());
    if (request.url() === 'http://localhost:3000/hw/store/api/products') {
        request.respond({
            content: 'application/json',
            headers: { 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify([
                {
                    id: 0,
                    name: 'Rustic Salad',
                    price: 175,
                },
                {
                    id: 1,
                    name: 'Rustic Bike',
                    price: 87,
                },
                {
                    id: 2,
                    name: 'Ergonomic Ball',
                    price: 290,
                },
                {
                    id: 3,
                    name: 'Rustic Bike',
                    price: 54,
                },
                {
                    id: 4,
                    name: 'Fantastic Pants',
                    price: 134,
                },
                {
                    id: 5,
                    name: 'Fantastic Chair',
                    price: 657,
                },
            ]),
        });
        return;
    }
    request.continue();
};

const assertOptions = {
    screenshotDelay: 100,
    captureElementFromTop: true,
};

describe('Страницы', () => {
    it('в магазине должны быть страницы: главная, каталог, условия доставки, контакты', async ({
        browser,
    }) => {
        await browser.url('http://localhost:3000/hw/store/');
        const mainText = await browser.$('[data-testid="page-name"]').getText();
        assert.equal(mainText, 'Welcome to Example store!');

        await browser.url('http://localhost:3000/hw/store/catalog');
        const catalogText = await browser
            .$('[data-testid="page-name"]')
            .getText();
        assert.equal(catalogText, 'Catalog');

        await browser.url('http://localhost:3000/hw/store/delivery');
        const deliveryText = await browser
            .$('[data-testid="page-name"]')
            .getText();
        assert.equal(deliveryText, 'Delivery');

        await browser.url('http://localhost:3000/hw/store/contacts');
        const contactsText = await browser
            .$('[data-testid="page-name"]')
            .getText();
        assert.equal(contactsText, 'Contacts');
    });
    it('страницы главная, условия доставки, контакты должны иметь статическое содержимое', async ({
        browser,
    }) => {
        const puppeteer = await browser.getPuppeteer(); //отключение через фрэйм и удобно по этому протоколу взаимод с браузером
        const [page] = await puppeteer.pages(); //выбираем первую вкладку

        await page.goto('http://localhost:3000/hw/store/'); //совершаем переход на сайт
        await page.waitForSelector('[data-page="main-page-wrap"]', {
            timeout: 5000,
        });
        await browser.assertView(
            'home',
            '[data-page="main-page-wrap"]',
            assertOptions
        );

        await page.goto('http://localhost:3000/hw/store/delivery/');
        await page.waitForSelector('[data-page="delivery-page-wrap"]', {
            timeout: 5000,
        });
        await browser.assertView(
            'delivery',
            '[data-page="delivery-page-wrap"]',
            assertOptions
        );

        await page.goto('http://localhost:3000/hw/store/contacts/');
        await page.waitForSelector('[data-page="contacts-page-wrap"]', {
            timeout: 5000,
        });
        await browser.assertView(
            'contacts',
            '[data-page="contacts-page-wrap"]',
            assertOptions
        );
    });
});

describe('Общие требования', () => {
    it('вёрстка должна адаптироваться под ширину экрана', async ({
        browser,
    }) => {
        const pages = [
            {
                name: 'home',
                url: '/',
            },
            {
                name: 'catalog',
                url: '/catalog',
            },
            {
                name: 'delivery',
                url: '/delivery',
            },
            {
                name: 'contacts',
                url: '/contacts',
            },
            {
                name: 'cart',
                url: '/cart',
            },
        ];

        const dimensions = [
            {
                name: 'mobile',
                width: 375,
            },
            {
                name: 'tablet',
                width: 768,
            },
            {
                name: 'laptop',
                width: 1920,
            },
        ];

        for (const page of pages) {
            for (const dimension of dimensions) {
                const puppeteer = await browser.getPuppeteer(); //отключение через фрэйм и удобно по этому протоколу взаимод с браузером
                const [tab] = await puppeteer.pages(); //выбираем первую вкладку

                await tab.goto(`http://localhost:3000/hw/store${page.url}`); //совершаем переход на сайт
                await browser.setWindowSize(dimension.width, 10000);
                await browser.assertView(
                    `${page.name} : ${dimension.name}`,
                    'body',
                    { ignoreElements: ['[data-testid="catalog-items"]'] }
                );
            }
        }
    });
    it('на ширине меньше 576px навигационное меню должно скрываться за "гамбургер"', async ({
        browser,
    }) => {
        const puppeteer = await browser.getPuppeteer(); //отключение через фрэйм и удобно по этому протоколу взаимод с браузером
        const [tab] = await puppeteer.pages(); //выбираем первую вкладку

        await tab.goto(`http://localhost:3000/hw/store/`); //совершаем переход на сайт
        await browser.setWindowSize(576, 10000);
        await browser.assertView('noburger-576', 'nav');
        await browser.setWindowSize(575, 10000);
        await browser.assertView('burger-575', 'nav');
    });
    it('при выборе элемента из меню "гамбургера", меню должно закрываться', async ({
        browser,
    }) => {
        const puppeteer = await browser.getPuppeteer(); //отключение через фрэйм и удобно по этому протоколу взаимод с браузером
        const [tab] = await puppeteer.pages(); //выбираем первую вкладку
        await tab.goto(`http://localhost:3000/hw/store`); //совершаем переход на сайт
        await browser.setWindowSize(575, 10000);
        await browser.assertView('burgerBeforeClick-575', 'nav');

        const burger = await tab.$('[data-burgerid="burger"]');
        await burger.evaluate((form) => form.click());
        await browser.assertView('burgerWithClick-575', 'nav');

        const link = await tab.$('.nav-link');
        await link.evaluate((form) => form.click());

        await tab.goto(`http://localhost:3000/hw/store/catalog`);
        await browser.setWindowSize(575, 10000);
        await browser.assertView('burgerAfterClickThroughLink-575', 'nav');
    });
});

describe('Каталог', () => {
    it('на странице с подробной информацией отображаются: название товара, его описание, цена, цвет, материал и кнопка * * "добавить в корзину"', async ({
        browser,
    }) => {
        const puppeteer = await browser.getPuppeteer(); //отключение через фрэйм и удобно по этому протоколу взаимод с браузером
        const [tab] = await puppeteer.pages(); //выбираем первую вкладку

        await tab.goto(`http://localhost:3000/hw/store/catalog/0`); //совершаем переход на сайт

        await tab.waitForSelector('.Product', {
            timeout: 5000,
        });

        await browser.assertView('ItemsInfo', '.Product', {
            ignoreElements: [
                '.ProductDetails-Name',
                'CartBadge',
                '.ProductDetails-Description',
                '.ProductDetails-Price',
                '.ProductDetails-Color',
                '.ProductDetails-Material',
            ],
        });
    });
    it('в каталоге должны отображаться товары, список которых приходит с сервера', async ({
        browser,
    }) => {
        const puppeteer = await browser.getPuppeteer(); //отключение через фрэйм и удобно по этому протоколу взаимод с браузером
        const [tab] = await puppeteer.pages(); //выбираем первую вкладку

        await tab.setRequestInterception(true);

        tab.on('request', mockRequest);

        await tab.goto(`http://localhost:3000/hw/store/catalog`); //совершаем переход на сайт

        await browser.assertView('cards-list', '[data-testid="catalog-items"]');
    });
    it('для каждого товара в каталоге отображается название, цена и ссылка на страницу с подробной информацией о товаре', async ({
        browser,
    }) => {
        const puppeteer = await browser.getPuppeteer(); //отключение через фрэйм и удобно по этому протоколу взаимод с браузером
        const [tab] = await puppeteer.pages(); //выбираем первую вкладку

        await tab.setRequestInterception(true);

        tab.on('request', mockRequest);

        await tab.goto(`http://localhost:3000/hw/store/catalog/`); //совершаем переход на сайт

        const wrap_link = await tab.$('.ProductItem-DetailsLink');

        const link = await (await wrap_link.getProperty('href')).jsonValue();
        
        assert.equal(link, "http://localhost:3000/hw/store/catalog/0");


        await browser.assertView('card-name', '.ProductItem-Name');
        await browser.assertView('card-price', '.ProductItem-Price');
        await browser.assertView('card-link', '.ProductItem-DetailsLink');



    });
});

describe('Корзина', () => {
    it('в шапке рядом со ссылкой на корзину должно отображаться количество не повторяющихся товаров в ней', async ({
        browser,
    }) => {
        const puppeteer = await browser.getPuppeteer(); //отключение через фрэйм и удобно по этому протоколу взаимод с браузером
        const [tab] = await puppeteer.pages(); //выбираем первую вкладку
        await tab.goto(`http://localhost:3000/hw/store/`);

        await browser.assertView('countLab', 'nav', {
            ignoreElements: ['.nav-link .lab'],
        });
    });
    it('в корзине должна отображаться таблица с добавленными в нее товарами', async ({
        browser,
    }) => {
        const puppeteer = await browser.getPuppeteer(); //отключение через фрэйм и удобно по этому протоколу взаимод с браузером
        const [tab] = await puppeteer.pages(); //выбираем первую вкладку
        await tab.goto(`http://localhost:3000/hw/store/cart`);

        await browser.assertView('cart', '.Cart', {
            ignoreElements: [
                '[data-testid="4"]',
                '.Cart-OrderPrice',
                '.infoaboutcart',
            ],
        });
    });
    it('для каждого товара должны отображаться название, цена, количество , стоимость, а также должна отображаться общая сумма заказа', async ({
        browser,
    }) => {
        const puppeteer = await browser.getPuppeteer(); //отключение через фрэйм и удобно по этому протоколу взаимод с браузером
        const [tab] = await puppeteer.pages(); //выбираем первую вкладку
        await tab.goto(`http://localhost:3000/hw/store/cart`);

        await browser.assertView('cart', '.Cart', {
            ignoreElements: [
                '[data-testid="4"]',
                '.Cart-OrderPrice',
                '.infoaboutcart',
            ],
        });
    });
    it('в корзине должна быть кнопка "очистить корзину", по нажатию на которую все товары должны удаляться', async ({
        browser,
    }) => {
        const puppeteer = await browser.getPuppeteer(); //отключение через фрэйм и удобно по этому протоколу взаимод с браузером
        const [tab] = await puppeteer.pages(); //выбираем первую вкладку
        await tab.goto(`http://localhost:3000/hw/store/cart`);

        const cart = await tab.$('.Cart-Clear');
        if (cart) {
            await cart.evaluate((form) => form.click());
        }

        await browser.assertView('cartAfterDelete', '.Cart');
    });
    it('если корзина пустая, должна отображаться ссылка на каталог товаров', async ({
        browser,
    }) => {
        const puppeteer = await browser.getPuppeteer(); //отключение через фрэйм и удобно по этому протоколу взаимод с браузером
        const [tab] = await puppeteer.pages(); //выбираем первую вкладку
        await tab.goto(`http://localhost:3000/hw/store/cart`);

        const cartTable = await tab.$('.Cart-Table');
        if (!cartTable) {
            await browser.assertView('emptyCart', '.Cart');
        }
    });
});
