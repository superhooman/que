import { PrismaClient } from '@prisma/client/edge';
import { getPrismaClient, PrismaClientType } from './getPrismaClient';

export const prisma = getPrismaClient(PrismaClient, PrismaClientType.EDGE);
