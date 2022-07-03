import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';

import type { NextPage } from 'next';

import { trpc } from '@src/utils/trcp';
import { withAuth } from '@src/utils/next/withAuth';
import { prisma } from '@src/prisma/client';
import { DashboardLayout } from '@src/layout/Dashboard';
import { Page } from '@src/typings/page';
import { PageEditor } from '@src/features/PageEditor';

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
