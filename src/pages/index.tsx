import { HeartFilledIcon } from '@radix-ui/react-icons';
import { GetServerSideProps, NextPage } from 'next';
import { Session } from 'next-auth';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../components/Button';
import { Space } from '../components/Space';
import { Paragraph, Title } from '../components/Typography';
import { LandingLayout } from '../layout/Landing';

const Index: NextPage = () => (
  <LandingLayout>
    <Head>
      <title>Que | Mirco landing pages</title>
    </Head>
    <div style={{ textAlign: 'center' }}>
      <Title font={32} level={1} style={{ lineHeight: 1.2 }}>Simple micro landing pages</Title>
      <Paragraph>Create effective micro landing page in several minutes without special skills</Paragraph>
      <Space size={24} />
      <Link href="/dashboard">
        <Button variant="primary" icon={<HeartFilledIcon />}>Try for free</Button>
      </Link>
      <Space size={24} />
      <Image src="/assets/hero.png" width={540} height={560} alt="Page screenshot" />
    </div>
  </LandingLayout>
);

export default Index;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale || 'en', ['common', 'create', 'errors'])),
    }
  };
};
