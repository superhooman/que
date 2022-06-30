import { TRPCError } from '@trpc/server';
import { MiddlewareFunction } from '@trpc/server/dist/declarations/src/internals/middlewares';
import { JWT } from 'next-auth/jwt';
import { Context } from '../context';

type NewContext = Context & { token: JWT }

export const authMiddleware: MiddlewareFunction<Context, NewContext, {}> = ({ ctx, next }) => {
    if (!ctx.token){
        throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
    return next({
        ctx: {
          ...ctx,
          token: ctx.token,
        },
    });
};
