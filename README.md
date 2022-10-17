Ko-fi webhook handler for Koa.

For more informations visit https://ko-fi.com/manage/webhooks

---

## Installation

### npm

`npm install @ko-fi/koa`

### yarn

`yarn add @ko-fi/koa`

## Example

View example implementation [here](https://github.com/oneso/ko-fi-koa-example);

    import Koa from 'koa';

    import { kofi } from '@ko-fi/koa';
    import Router from '@koa/router';

    const app = new Koa();
    const router = new Router();

    kofi(router, {
        onData: (data, req) => {
            console.log('onData called');
        },
        onCommission: (data, req) => {
            console.log('onCommission called');
        },
        onDonation: (data, req) => {
            console.log('onDonation called');
        },
        onShopOrder: (data, req) => {
            console.log('onShopOrder called');
        },
        onSubscription: (data, req) => {
            console.log('onSubscription called');
        },
        onError: (err, req) => {
            console.error('onError called');
        },
        verificationToken: 'token',
    });

    app
        .use(router.routes())
        .use(router.allowedMethods());

    app.listen(3000);
