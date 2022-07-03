import clsx from 'clsx';
import React, { ReactNode } from 'react';
import toast, { Toast as ToastProps } from 'react-hot-toast';
import { Check } from '../../../../components/Check';
import cls from './Toast.module.scss';

interface Props extends ToastProps {
    updateHeight: (id: string, height: number) => void;
}

export const Toast: React.FC<Props> = ({ ariaProps, message, type, visible, updateHeight, id, style }) => {
    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (ref.current) {
            updateHeight(id, ref.current.clientHeight);
        }
    }, [updateHeight, id]);

    React.useEffect(() => {
        if (visible || !ref.current) {
            return;
        }
        const element = ref.current;
        const remove = () => toast.remove(id);
        element.addEventListener('transitionend', remove);
        return () => {
            element.removeEventListener('transitionend', remove);
        };
    }, [visible, id]);

    return (
        <div
            className={clsx(cls.root, {
                [cls.active]: visible,
                [cls.outro]: !visible,
            })}
            style={style}
            ref={ref}
            {...ariaProps}
        >
            <div className={cls.content}>
                {type === 'loading' ? <Check value loading /> : null}
                {type === 'success' ? <Check value /> : null}
                {type === 'error' ? <Check value={false} /> : null}
                <div>{message as ReactNode}</div>
            </div>
        </div>
    );
};
