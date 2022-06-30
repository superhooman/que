import { PrismaClient } from '@prisma/client/edge';
import { prisma as prismaClient } from './client';
import { getPrismaClient, PrismaClientType } from './getPrismaClient';

let client: PrismaClient;

if (process.env.NODE_ENV === 'development') {
    client = prismaClient;
} else {
    client = getPrismaClient(PrismaClient, PrismaClientType.EDGE);
}

export const prisma = client;
