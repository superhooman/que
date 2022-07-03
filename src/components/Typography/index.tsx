import React, { HTMLAttributes } from 'react';
import clsx from 'clsx';

import { Size } from '@src/typings/size';

import cls from './Typography.module.scss';

interface GenericTextProps {
    font?: number;
    size?: Size;
    type?: 'primary' | 'secondary' | 'error';
}

interface TextAs {
    as?: 'span' | 'b' | 'strong' | 'i' | 'em' | 'mark' | 'del' | 'ins' | 'sub' | 'sup';
}

const getTypeClass = (type: GenericTextProps['type'] = 'primary') => cls[type];

export const Text: React.FC<GenericTextProps & HTMLAttributes<HTMLSpanElement> & TextAs> = ({
    font,
    size = 'md',
    className,
    style,
    type = 'primary',
    as = 'span',
    ...props
}) => {
    const Element = as as unknown as React.FC<HTMLAttributes<HTMLSpanElement>>;
    return (
        <Element
            className={clsx(
                cls.text,
                className,
                getTypeClass(type),
            )}
            style={{
                ...style,
                fontSize: font,
            }}
            data-size={size}
            {...props}
        />
    );
};

interface TitleProps extends Omit<GenericTextProps, 'size'> {
    level?: 1 | 2 | 3 | 4;
    noMargin?: boolean;
}

export const Title: React.FC<TitleProps & HTMLAttributes<HTMLHeadingElement>> = ({
    level = 1,
    font,
    className,
    noMargin,
    style,
    type = 'primary',
    ...props }) => {
    const Heading = `h${level}` as unknown as React.FC<HTMLAttributes<HTMLHeadingElement>>;
    return (
        <Heading
            className={clsx(
                cls.heading,
                className,
                getTypeClass(type),
            )}
            style={{
                ...style,
                ...(noMargin ? { margin: 0 } : {}),
                fontSize: font,
            }}
            {...props}
        />
    );
};

interface ParagraphProps extends Omit<GenericTextProps, 'size'> {
    noMargin?: boolean;
}

export const Paragraph: React.FC<ParagraphProps & HTMLAttributes<HTMLParagraphElement>> = ({
    font,
    className,
    noMargin,
    style,
    type = 'primary',
    ...props
}) => (
    <p
        className={clsx(
            cls.paragraph,
            className,
            getTypeClass(type),
        )}
        style={{
            ...style,
            ...(noMargin ? { margin: 0 } : {})
        }}
        {...props}
    />
);
