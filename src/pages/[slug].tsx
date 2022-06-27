import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { Avatar } from '../components/Avatar';
import { Loader } from '../components/Loader';
import { Space } from '../components/Space';
import { Stack } from '../components/Stack';
import { Paragraph, Text, Title } from '../components/Typography';
import { BlockRenderer } from '../features/BlockRenderer';
import { PageLayout } from '../layout/Page';
import { prisma } from '../prisma/client';
import { PageWithUser } from '../typings/page';

interface Props {
    page: PageWithUser;
}

const UserPage: NextPage<Props> = ({ page }) => {
    if (!page) {
        return (
            <PageLayout>
                <Loader />
            </PageLayout>
        );
    }

    const { user, blocks } = page;

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
