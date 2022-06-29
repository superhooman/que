import { IncomingMessage, ServerResponse } from 'http';
import { getSession } from 'next-auth/react';
import * as trpc from '@trpc/server';
import { NodeHTTPCreateContextFnOptions } from '@trpc/server/adapters/node-http';
import * as trpcNext from '@trpc/server/adapters/next';

import { prisma } from '../prisma/edge';
import { Session } from '../typings/session';

export const createContext = async ({
    req,
    res,
}:
    | trpcNext.CreateNextContextOptions
    | NodeHTTPCreateContextFnOptions<IncomingMessage, ServerResponse>) => {
    const session = (await getSession({ req })) as Session;

    return {
        req,
        res,
        prisma,
        session,
    };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
