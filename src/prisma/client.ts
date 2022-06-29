import { PrismaClient } from '@prisma/client';
import { getPrismaClient, PrismaClientType } from './getPrismaClient';

export const prisma = getPrismaClient(PrismaClient, PrismaClientType.CLIENT);
