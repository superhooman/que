import { useSession } from 'next-auth/react';
import React, { ReactNode } from 'react';
import { Avatar, AvatarProps } from '../../components/Avatar';

interface Props extends Omit<AvatarProps, 'image' | 'name' | 'loading'> {
    fallback?: ReactNode;
}

export const User = React.forwardRef<HTMLSpanElement, Props>(({ fallback = null, ...props }, ref) => {
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return (
            <Avatar ref={ref} {...props} loading />
        );
    }

    if (status === 'unauthenticated' || !session) {
        return (
            <>
                {fallback}
            </>
        );
    }

    return (
        <Avatar
            ref={ref}
            image={session.user?.image || ''}
            name={session.user?.name || session.user?.email || ''}
            {...props}
        />
    );
});

User.displayName = 'User';
