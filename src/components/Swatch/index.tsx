import React from 'react';
import clsx from 'clsx';

import cls from './Swatch.module.scss';

interface Item {
    value: string;
    label: string;
}

interface Props {
    value: string;
    onChange: (value: string) => void;
    items: Item[];
    label?: string;
    className?: string;
}

export const Swatch: React.FC<Props> = ({ value, onChange, items, className, label }) => {
    const getClickHandler = React.useCallback((value: string) => () => onChange(value), [onChange]);

    return (
        <div className={clsx(cls.root, className)}>
            {label ? <label className={cls.label}>{label}</label> : null}
            <div className={cls.items}>
                {items.map(item => (
                    <button
                        key={item.value}
                        className={cls.item}
                        onClick={getClickHandler(item.value)}
                        data-selected={item.value === value}
                        type="button"
                    >
                        {item.label}
                    </button>
                ))}
            </div>
        </div>
    );
};
