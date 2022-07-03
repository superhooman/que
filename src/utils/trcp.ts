import { createReactQueryHooks } from '@trpc/react';

import type { AppRouter } from '@src/pages/api/trpc/[trpc]';

export const trpc = createReactQueryHooks<AppRouter>();
