import clsx from 'clsx';
import Link from 'next/link';
import { Container } from '../../components/Container';
import { Logo } from '../../components/Logo';
import { Footer } from '../../features/Footer';
import { UserMenu } from '../../features/UserMenu';
import cls from './Default.module.scss';

export const DefaultLayout: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => (
    <div className={clsx(cls.root, className)} {...props}>
        <style jsx global>{`
            body, html {
                background-color: var(--c-control);
            }
            @media screen and (max-width: 520px) {
                body, html {
                    background-color: var(--c-bg);
                }
            }
        `}</style>
        <Container size="sm">
            <nav className={cls.header}>
                <div className={cls.logo}>
                    <Link href="/">
                        <a className={cls.logo}>
                            <Logo size={24} />
                        </a>
                    </Link>
                </div>
                <UserMenu />
            </nav>
            <main className={cls.main}>
                {children}
            </main>
            <Footer className={cls.footer} />
        </Container>
    </div>
);
