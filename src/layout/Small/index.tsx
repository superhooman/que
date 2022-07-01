import React from 'react';
import clsx from 'clsx';
import cls from './Small.module.scss';
import { Logo } from '../../components/Logo';
import { Stack } from '../../components/Stack';
import Link from 'next/link';
import { Footer } from '../../features/Footer';
import { Text } from '../../components/Typography';
import { Container } from '../../components/Container';

export const SmallLayout: React.FC<React.HTMLAttributes<HTMLDivElement> & { error?: string }> = ({
    children,
    className,
    error,
    ...props
}) => (
    <div className={clsx(cls.root, className)}>
        <style jsx global>{`
            body, html {
                background-color: var(--c-control);
            }
            @media screen and (max-width: 408px) {
                body, html {
                    background-color: var(--c-bg);
                }
            }
        `}</style>
        <Container size="xs">
            <Stack fullWidth gap={24} direction="column" alignItems="center">
                <div className={cls.logo}>
                    <Link href="/">
                        <a>
                            <Logo />
                        </a>
                    </Link>
                </div>
                {error ? <Text className={cls.error} type="error" size="xs">{error}</Text> : null}
                <div className={cls.content} {...props}>
                    {children}
                </div>
                <Footer />
            </Stack>
        </Container>
    </div>
);
