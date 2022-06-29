import { PrismaClient } from '@prisma/client';

type PrismaClientClass = new () => PrismaClient;

export enum PrismaClientType {
    EDGE = '__prisma_edge',
    CLIENT = '__prisma_client',
}

type GlobalThisWithPrismaClient = typeof globalThis & {
    [PrismaClientType.EDGE]: PrismaClient;
    [PrismaClientType.CLIENT]: PrismaClient;
};

export const getPrismaClient = (Prisma: PrismaClientClass, name: PrismaClientType) => {
    if (process.env.NODE_ENV === 'production') {
		return new Prisma();
	} else {
		const newGlobalThis = globalThis as GlobalThisWithPrismaClient;
		if (!newGlobalThis[name]) {
			newGlobalThis[name] = new Prisma() as PrismaClient;
		}
		return newGlobalThis[name];
	}
};

