
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { blocksSchemas } from '../../../blocks';
import { RESTRICTED_OR_RESERVED_SLUGS } from '../../../constants/slugs';
import { createRouter } from '../../../utils/server/createRouter';
import { createPageSchema } from '../../../validators/page/create';
import { Context } from '../../context';
import { authMiddleware } from '../../middleware/auth';

export const pageRouter = createRouter<Context>()
    .middleware(authMiddleware)
    .query('exists', {
        input: createPageSchema,
        async resolve({ ctx, input: { slug } }) {
            const loweredSlug = slug.toLocaleLowerCase();
            if (RESTRICTED_OR_RESERVED_SLUGS.includes(loweredSlug)) {
                return {
                    exists: true,
                };
            }
            const exists = (await ctx.prisma.page.count({ where: { slug: loweredSlug } })) > 0;
            return {
                exists,
            };
        }
    })
    .mutation('create', {
        input: createPageSchema,
        async resolve({ ctx, input: { slug } }) {
            const loweredSlug = slug.toLocaleLowerCase();

            if (RESTRICTED_OR_RESERVED_SLUGS.includes(loweredSlug)) {
                throw new TRPCError({ code: 'CONFLICT' });
            }

            const exists = (await ctx.prisma.page.count({ where: { slug: loweredSlug } })) > 0;

            if (exists) {
                throw new TRPCError({ code: 'CONFLICT' });
            }

            const page = await ctx.prisma.page.create({
                data: {
                    slug: loweredSlug,
                    userId: ctx.session.id,
                    blocks: [],
                },
            });

            return {
                page,
            };
        }
    })
    .mutation('update', {
        input: z.object({
            slug: z.string(),
            blocks: blocksSchemas,
        }),
        async resolve({ ctx, input: { blocks, slug } }) {
            const loweredSlug = slug.toLocaleLowerCase();

            if (RESTRICTED_OR_RESERVED_SLUGS.includes(loweredSlug)) {
                throw new TRPCError({ code: 'CONFLICT' });
            }

            const page = await ctx.prisma.page.findFirst({ 
                where: {
                    userId: ctx.session.id,
                    slug: loweredSlug,
                },
            });

            if (!page) {
                throw new TRPCError({ code: 'FORBIDDEN' });
            }

            await ctx.prisma.page.update({
                where: {
                    slug: loweredSlug,
                },
                data: {
                    blocks,
                }
            });

            return {
                done: true,
            };
        }
    });