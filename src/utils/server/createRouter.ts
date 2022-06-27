import * as trpc from '@trpc/server';

export const createRouter = <Context>() => {
    return trpc.router<Context>();
};
