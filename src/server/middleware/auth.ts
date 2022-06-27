import { TRPCError } from '@trpc/server';
import { MiddlewareFunction } from '@trpc/server/dist/declarations/src/internals/middlewares';
import { Session } from '../../typings/session';
import { Context } from '../context';

type NewContext = Context & { session: Session }

export const authMiddleware: MiddlewareFunction<Context, NewContext, {}> = ({ ctx, next }) => {
    if (!ctx.session){
        throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
    return next({
        ctx: {
          ...ctx,
          session: ctx.session,
        },
    });
};
