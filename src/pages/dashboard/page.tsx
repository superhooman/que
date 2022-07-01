import type { NextPage } from 'next';
import React from 'react';
import { withAuth } from '../../middlewares/withAuth';
import { prisma } from '../../prisma/client';
import { Page } from '../../typings/page';

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
