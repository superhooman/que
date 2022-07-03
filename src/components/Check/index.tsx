import { CheckIcon, Cross1Icon } from '@radix-ui/react-icons';
import clsx from 'clsx';

import { Loader } from '@src/components/Loader';

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
                <Cross1Icon />
            )}
        </div>
    );
};
