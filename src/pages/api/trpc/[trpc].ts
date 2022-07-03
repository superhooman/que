import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';

import { Context, createContext } from '@src/server/context';
import { pageRouter } from '@src/server/routes/page';

export const config = {
  runtime: 'experimental-edge',
};

export const appRouter = trpc
  .router<Context>()
  .merge('page.', pageRouter);

export type AppRouter = typeof appRouter;

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
});
