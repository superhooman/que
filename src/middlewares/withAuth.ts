import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult, PreviewData } from 'next';
import { getSession } from 'next-auth/react';
import { ParsedUrlQuery } from 'querystring';
import { Session } from '../typings/session';

type Handler<
    P extends { [key: string]: any } = { [key: string]: any },
    Q extends ParsedUrlQuery = ParsedUrlQuery,
    D extends PreviewData = PreviewData
> = (context: GetServerSidePropsContext<Q, D>, session: Session) => Promise<GetServerSidePropsResult<P>>

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
    const session = (await getSession(ctx)) as Session;

    if (session) {
        if (isHandler(handlerOrProps)) {
            return await handlerOrProps(ctx, session);
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