import type { NextPage } from 'next';
import React from 'react';
import { trpc } from '../../utils/trcp';
import { withAuth } from '../../middlewares/withAuth';
import { prisma } from '../../prisma/client';
import { DashboardLayout } from '../../layout/Dashboard';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Page } from '../../typings/page';
import { BlockEditor } from '../../features/BlockEditor';
import { Stack } from '../../components/Stack';
import { Text, Title } from '../../components/Typography';
import { Button } from '../../components/Button';
import { useTranslation } from 'next-i18next';
import { Space } from '../../components/Space';
import { HOST } from '../../constants';
import { EyeOpenIcon, Pencil2Icon } from '@radix-ui/react-icons';
import { BlockRenderer } from '../../features/BlockRenderer';
import Link from 'next/link';
import Head from 'next/head';

interface Props {
  page: Page;
}

const Home: NextPage<Props> = ({ page }) => {
  const { t } = useTranslation('common');
  const [preview, setPreview] = React.useState(false);
  const [data, setData] = React.useState(page?.blocks || []);
  const mutation = trpc.useMutation(['page.update']);

  const togglePreview = React.useCallback(() => setPreview(v => !v), []);

  const save = React.useCallback(() => {
    mutation.mutate({
      slug: page?.slug,
      blocks: data,
    });
  }, [data, page?.slug, mutation]);

  if (!page) {
    return (
      <DashboardLayout />
    );
  }

  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Stack justifyContent="space-between">
        <Link href={`https://${HOST}/${page.slug}`}>
          <a>
          <Title level={1}>
            <Text size="lg" type="secondary">{HOST}/</Text>
            <Text size="lg">{page.slug}</Text>
          </Title>
          </a>
        </Link>
        <Stack gap={8}>
          <Button
            variant="default"
            onClick={togglePreview}
            icon={preview ? <Pencil2Icon /> : <EyeOpenIcon />}
          />
          <Button
            variant="primary"
            disabled={mutation.isLoading || data.length < 1}
            loading={mutation.isLoading}
            onClick={save}
          >
            {t('save')}
          </Button>
        </Stack>
      </Stack>
      <Space size={24} />
      {preview ? (
        <BlockRenderer
          blocks={data}
        />
      ) : (
        <BlockEditor
          blocks={data}
          onChange={setData}
        />
      )}
    </DashboardLayout>
  );
};

export default Home;

export const getServerSideProps = withAuth(async ({ locale }, session) => {
  const page = (await prisma.page.findFirst({
    where: {
      userId: session.id,
    },
  })) as Page | null;

  if (!page) {
    return {
      redirect: {
        destination: '/dashboard/create',
      },
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common', 'create', 'errors'])),
      page,
      session,
    }
  };
});
