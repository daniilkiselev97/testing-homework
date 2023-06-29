import { it, expect } from '@jest/globals';
import { ExampleApi, CartApi } from './client/api';
import { initStore } from './client/store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Application } from './client/Application';
import React from 'react';
import { render } from 'react-dom';

it('hghghgh', () => {
    const basename = './client/hw/store';
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

    const container = render(application, document.getElementById('root'));
    console.log(container)
});
