import { it, expect } from '@jest/globals';
import { ExampleApi, CartApi } from '../../src/client/api';
import { initStore } from '../../src/client/store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Application } from '../../src/client/Application';
import React from 'react';
import { render, screen, within } from '@testing-library/react';








const renderApplication = () => {
    //подготовка
    const basename = '/hw/store';
    const api = new ExampleApi(basename);
    const cart = new CartApi();

    const store = initStore(api, cart);
    const application = (
        <BrowserRouter basename={basename}>
            <Provider store={store}>
                <Application />
            </Provider>
        </BrowserRouter>
    );
    return render(application);
};

describe('Общие требование(часть, остальные сделаны через Гермиону)', ()=>{
    it('отображаются ссылки на страницы магазина и ссылка на корзину', () => {
    
        //действие
        const { container, getByTestId } = renderApplication();
    
        //проверка
    
        const links = getByTestId('links');
        const link = within(links).getAllByRole('link');
    
        expect(link.map((el) => el.getAttribute('href'))).toEqual([
            '/hw/store/',
            '/hw/store/catalog',
            '/hw/store/delivery',
            '/hw/store/contacts',
            '/hw/store/cart',
        ]);
    });
    
    it('название магазина в шапке должно быть ссылкой на главную страницу', () => {
        //действие
    
        const { container, getByTestId } = renderApplication();
    
        //проверка
    
        const links = getByTestId('links');
        const link = within(links).getAllByRole('link');
    
        const linksAllPages = link.map((page) => page.getAttribute('href'));
        const linkToMainPage = linksAllPages[0];
        expect(linkToMainPage).toEqual('/hw/store/');
    });

})















function writeLog(arg0: HTMLElement[], arg1: string, arg2: string) {
    throw new Error('Function not implemented.');
}

