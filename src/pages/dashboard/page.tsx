import React from 'react';

import type { NextPage } from 'next';

import { withAuth } from '@src/utils/next/withAuth';
import { prisma } from '@src/prisma/client';
import { Page } from '@src/typings/page';

const Default: NextPage = () => <></>;

export default Default;

export const getServerSideProps = withAuth(async ({ locale }, { id }) => {
  const page = (await prisma.page.findFirst({
    select: {
        slug: true,
    },
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
    redirect: {
        destination: `/${page.slug}`,
        permanent: false,
    },
  };
});
