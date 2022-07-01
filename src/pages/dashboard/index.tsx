import type { NextPage } from 'next';
import React from 'react';
import { trpc } from '../../utils/trcp';
import { withAuth } from '../../middlewares/withAuth';
import { prisma } from '../../prisma/client';
import { DashboardLayout } from '../../layout/Dashboard';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Page } from '../../typings/page';
import Head from 'next/head';
import { PageEditor } from '../../features/PageEditor';

interface Props {
  page: Page;
}

const Home: NextPage<Props> = ({ page }) => {
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
      <PageEditor page={page} />
    </DashboardLayout>
  );
};

export default Home;

export const getServerSideProps = withAuth(async ({ locale }, { id }) => {
  const page = (await prisma.page.findFirst({
    where: {
      userId: id,
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
    }
  };
});
