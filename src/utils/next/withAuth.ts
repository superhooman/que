import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult, PreviewData } from 'next';
import { JWT } from 'next-auth/jwt';
import { ParsedUrlQuery } from 'querystring';
import { getToken } from '../getToken';

type Handler<
    P extends { [key: string]: any } = { [key: string]: any },
    Q extends ParsedUrlQuery = ParsedUrlQuery,
    D extends PreviewData = PreviewData
> = (context: GetServerSidePropsContext<Q, D>, token: JWT) => Promise<GetServerSidePropsResult<P>>

const isHandler = <
    P extends { [key: string]: any } = { [key: string]: any },
    Q extends ParsedUrlQuery = ParsedUrlQuery,
    D extends PreviewData = PreviewData
>(handlerOrProps: Handler<P, Q, D> | P): handlerOrProps is Handler<P> => {
        return typeof handlerOrProps === 'function';
    };

export const withAuth = <
  P extends { [key: string]: any } = { [key: string]: any },
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData
>(handlerOrProps: Handler<P, Q, D> | P, redirect = '/auth'): GetServerSideProps<P, Q, D> => async (ctx) => {
    const token = await getToken(ctx.req);

    if (token) {
        if (isHandler(handlerOrProps)) {
            return await handlerOrProps(ctx, token);
        }
        return {
            props: handlerOrProps as P,
        };
    }

    return {
        redirect: {
            destination: redirect,
            permanent: false,
        },
    };
};
