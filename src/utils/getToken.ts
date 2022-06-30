import { getToken as getTokenBase, GetTokenParams } from 'next-auth/jwt';

export const getToken = async (req: GetTokenParams['req']) => {
    const token = await getTokenBase({ req });
    return token;
};
