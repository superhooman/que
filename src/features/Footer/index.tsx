import Link from 'next/link';
import React from 'react';
import { Text } from '../../components/Typography';
import { HOST } from '../../constants';

export const Footer: React.FC<React.HTMLAttributes<HTMLElement>> = ({ ...props }) => {
    const year = React.useMemo(() => {
        const date = new Date();
        return date.getFullYear();
    }, []);
    return (
        <footer {...props}>
            <Text size="xs" type="secondary">{year} © <Link href="/"><a>{HOST}</a></Link></Text>
        </footer>
    );
};
