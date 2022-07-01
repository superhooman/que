import { CheckIcon, XIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { Loader } from '../Loader';
import cls from './Check.module.scss';

interface Props {
    value: boolean;
    loading?: boolean;
}

export const Check: React.FC<Props> = ({ value, loading }) => {
    if (loading) {
        return (
            <div className={clsx(cls.root, cls.loading)}>
                <Loader />
            </div>
        );
    }
    return (
        <div className={cls.root} data-value={value}>
            {value ? (
                <CheckIcon />
            ) : (
                <XIcon />
            )}
        </div>
    );
};
