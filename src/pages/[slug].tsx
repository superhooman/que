import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';

import { Avatar } from '@src/components/Avatar';
import { Loader } from '@src/components/Loader';
import { Space } from '@src/components/Space';
import { Stack } from '@src/components/Stack';
import { Paragraph, Text, Title } from '@src/components/Typography';
import { BlockRenderer } from '@src/features/BlockRenderer';
import { PageLayout } from '@src/layout/Page';
import { prisma } from '@src/prisma/client';
import { PageWithUser } from '@src/typings/page';

interface Props {
    page: PageWithUser;
}

const UserPage: NextPage<Props> = (props) => {
    if (!props.page) {
        return (
            <PageLayout>
                <Loader />
            </PageLayout>
        );
    }

    const { user, blocks } = props.page;

    return (
        <PageLayout>
            <Head>
                <title>{user.name || user.email} | Que</title>
            </Head>
            <Stack direction="column" gap={8}>
                <Avatar
                    image={user.image || undefined}
                    name={user.name || user.email || undefined}
                    size="lg"
                />
                <div>
                    {user.name ? (<Title noMargin>{user.name}</Title>) : null}
                    {user.email ? (<Text size="sm" type="secondary">{user.email}</Text>) : null}
                </div>
            </Stack>
            <Space size={16} />
            <BlockRenderer blocks={blocks || []} />
        </PageLayout>
    );
};

export const getServerSideProps: GetServerSideProps<Props, { slug: string }> = async (ctx) => {
    if (!ctx.params) {
        return {
            notFound: true,
        };
    }

    const { slug } = ctx.params;

    const loweredSlug = slug.toLocaleLowerCase();

    const page = (await prisma.page.findFirst({
        where: {
            slug: loweredSlug,
        },
        include: {
            user: true,
        }
    })) as PageWithUser | null;

    if (!page) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            page,
        }
    };
};

export default UserPage;
