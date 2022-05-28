import { EnvelopeClosedIcon, FaceIcon } from '@radix-ui/react-icons';
import { GetServerSideProps, NextPage } from 'next';
import { ClientSafeProvider, getProviders, signIn } from 'next-auth/react';
import React from 'react';
import { Button } from '../components/Button';
import { Modal, ModalDescription, ModalTitle } from '../components/Modal';
import { Stack } from '../components/Stack';

const GoogleIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M15.68 8.18183C15.68 7.61456 15.6291 7.06911 15.5345 6.54547H8V9.64002H12.3055C12.12 10.64 11.5564 11.4873 10.7091 12.0546V14.0618H13.2945C14.8073 12.6691 15.68 10.6182 15.68 8.18183Z" fill="#4285F4" />
    <path fillRule="evenodd" clipRule="evenodd" d="M8 16C10.16 16 11.9709 15.2837 13.2945 14.0618L10.7091 12.0546C9.99273 12.5346 9.07636 12.8182 8 12.8182C5.91636 12.8182 4.15272 11.4109 3.52363 9.52002H0.850906V11.5927C2.16727 14.2073 4.87272 16 8 16Z" fill="#34A853"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M3.52364 9.52001C3.36364 9.04001 3.27273 8.52729 3.27273 8.00001C3.27273 7.47274 3.36364 6.96001 3.52364 6.48001V4.40729H0.850909C0.309091 5.48729 0 6.70911 0 8.00001C0 9.29092 0.309091 10.5127 0.850909 11.5927L3.52364 9.52001Z" fill="#FBBC05"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M8 3.18182C9.17454 3.18182 10.2291 3.58545 11.0582 4.37818L13.3527 2.08364C11.9673 0.792727 10.1564 0 8 0C4.87272 0 2.16727 1.79273 0.850906 4.40727L3.52363 6.48C4.15272 4.58909 5.91636 3.18182 8 3.18182Z" fill="#EA4335"/>
  </svg>
);

const getProviderButton = (provider: string, onClick: React.MouseEventHandler<HTMLButtonElement>) => {
  if (provider === 'google') {
    return (
      <Button
        key={provider}
        icon={<GoogleIcon />}
        onClick={onClick}
      >
        Continue with Google
      </Button>
    );
  }
  return null;
};

interface Props {
  providers: ClientSafeProvider[];
}

const Test: NextPage<Props> = ({ providers }) => {
  const [open, setOpen] = React.useState(false);

  const toggleOpen = React.useCallback(() => setOpen(v => !v), []);

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    }}>
      <Button onClick={toggleOpen}>Open modal</Button>
      <Modal
        open={open}
        onOpenChange={toggleOpen}
      >
        <ModalTitle>Create a new profile ✨</ModalTitle>
        <ModalDescription>By continuing you agree to our terms of service and privacy policy.</ModalDescription>
        <Stack gap={8} direction="column">
          {providers.map(({ id }) => getProviderButton(id, () => signIn(id)))}
          <Button icon={<EnvelopeClosedIcon />} variant="primary" onClick={toggleOpen}>Continue with email</Button>
          <Button variant="ghost" onClick={toggleOpen}>Close</Button>
        </Stack>
      </Modal>
    </div>
  );
};

export default Test;

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const providers = Object.values(await getProviders() || {});

  return {
    props: {
      providers,
    }
  };
};