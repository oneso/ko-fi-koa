import type Application from 'koa';
import koaBody from 'koa-body';

import { Config, mergeConfig, RequestData, Type } from '@ko-fi/types';

import type Router from '@koa/router';

export const kofi = (router: Router, config?: Partial<Config<Application.DefaultContext>>) => {
    const conf = mergeConfig(config);

    router.post(conf.endpoint, koaBody(), async (ctx) => {
        const { data } = ctx.request.body as { data: string; };

        try {
            const parsed: RequestData = JSON.parse(data);

            if (config.verificationToken && parsed.verification_token !== config.verificationToken) {
                console.error('Ko-fi invalid verification token');
                config.onError?.('Ko-fi invalid verification token', ctx);

                return ctx.status = 401;
            }

            await conf.onData?.(parsed, ctx);

            switch (parsed.type) {
                case Type.Commission:
                    await conf.onCommission?.(parsed, ctx);
                    break;
                case Type.Donation:
                    await conf.onDonation?.(parsed, ctx);
                    break;
                case Type.ShopOrder:
                    await conf.onShopOrder?.(parsed, ctx);
                    break;
                case Type.Subscription:
                    await conf.onSubscription?.(parsed, ctx);
                    break;
            }
        } catch (err) {
            console.error('Ko-fi request error: ', err);
            config.onError?.(err, ctx);

            return ctx.status = 400;
        }

        ctx.status = 200;
    });
};
