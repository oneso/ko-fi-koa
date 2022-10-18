import type Application from 'koa';
import koaBody from 'koa-body';

import { kofiHandler } from '@ko-fi/handler';
import { Config, mergeConfig } from '@ko-fi/types';

import type Router from '@koa/router';

export const kofi = (router: Router, config?: Partial<Config<Application.DefaultContext>>) => {
    const conf = mergeConfig(config);

    router.post(conf.endpoint, koaBody(), async (ctx) => {
        const { data } = ctx.request.body as { data: string; };

        ctx.status = await kofiHandler(data, conf, ctx);
    });
};
