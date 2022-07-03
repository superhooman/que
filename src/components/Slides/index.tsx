import React from 'react';
import FocusTrap from 'focus-trap-react';

import cls from './Slides.module.scss';

interface SlidesProps {
    step: number;
    children: React.ReactNode[];
}

export const Slides: React.FC<SlidesProps> = ({
    step,
    children,
}) => {
    const onScroll = React.useCallback<React.UIEventHandler<HTMLDivElement>>(e => {
        e.preventDefault();
        e.currentTarget.scrollLeft = 0;
    }, []);

    return (
        <div
            onScroll={onScroll}
            className={cls.root}
        >
            <div
                className={cls.slidesWrapper}
                style={{
                    width: `${children.length * 100}%`,
                    transform: `translateX(${step / children.length * -100}%) translateZ(0px)`
                }}
            >
                {children.map((slide, index) => (
                    <div
                        key={index}
                        tabIndex={index === step ? 0 : -1}
                        className={cls.slide}
                        data-hidden={index !== step}
                    >
                        {slide}
                    </div>
                ))}
            </div>
        </div>
    );
};
