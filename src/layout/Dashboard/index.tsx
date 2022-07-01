import clsx from 'clsx';
import Link from 'next/link';
import { Logo } from '../../components/Logo';
import { UserMenu } from '../../features/UserMenu';
import cls from './Dashboard.module.scss';

export const DashboardLayout: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => (
    <div className={clsx(cls.root, className)} {...props}>
        <div className={cls.flow}>
            <nav className={cls.nav}>
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
        </div>
    </div>
);
