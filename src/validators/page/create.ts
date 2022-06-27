import { z, ZodObject } from 'zod';
import { FormErrors } from '../constants';

const ALHPANUM_UNDERSCORE_DOT = /^[a-z0-9._]+$/i;

export const createPageSchema = z.object({
    slug: z.string()
        .regex(ALHPANUM_UNDERSCORE_DOT, FormErrors.SLUG)
        .min(3, FormErrors.SLUG_LENGTH)
        .max(64, FormErrors.SLUG_LENGTH),
});

export type CreatePageBody = z.infer<typeof createPageSchema>;
