import { IncomingMessage, ServerResponse } from 'http';
import * as trpc from '@trpc/server';
import { NodeHTTPCreateContextFnOptions } from '@trpc/server/adapters/node-http';
import * as trpcNext from '@trpc/server/adapters/next';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';

import { prisma } from '../prisma/edge';
import { getToken } from '../utils/getToken';

export const createContext = async ({
    req,
    res,
}:
    | trpcNext.CreateNextContextOptions
    | NodeHTTPCreateContextFnOptions<IncomingMessage & {
        cookies: NextApiRequestCookies;
    }, ServerResponse>) => {
    const token = await getToken(req);

    return {
        req,
        res,
        prisma,
        token,
    };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
