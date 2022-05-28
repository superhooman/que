import clsx from 'clsx';
import React, { SVGProps } from 'react';

import cls from './Loader.module.css';

interface Props extends SVGProps<SVGSVGElement> {
  size?: number
}

export const Loader = React.forwardRef<SVGSVGElement, Props>(({ size = 15, className, ...props }, ref) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 15 15"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    {...props}
    ref={ref}
    className={clsx(className, cls.root)}
  >
    <path d="M7.5 4a.5.5 0 0 1-.5-.5v-3a.5.5 0 1 1 1 0v3a.5.5 0 0 1-.5.5Z" />
    <path d="M8.92 4.3a.5.5 0 0 1-.25-.66L9.89.9a.5.5 0 0 1 .91.4L9.58 4.06a.5.5 0 0 1-.66.25Z" opacity=".3" />
    <path d="M10.1 5.16a.5.5 0 0 1 .03-.7l2.23-2.02a.5.5 0 0 1 .67.74L10.8 5.2a.5.5 0 0 1-.7-.04Z" opacity=".35" />
    <path d="M10.82 6.42a.5.5 0 0 1 .32-.63L14 4.86a.5.5 0 0 1 .3.95l-2.84.93a.5.5 0 0 1-.63-.32Z" opacity=".4" />
    <path d="M10.98 7.87a.5.5 0 0 1 .55-.45l2.97.31a.5.5 0 1 1-.1 1l-2.98-.31a.5.5 0 0 1-.44-.55Z" opacity=".45" />
    <path d="M10.53 9.25a.5.5 0 0 1 .68-.18l2.6 1.5a.5.5 0 1 1-.5.87l-2.6-1.5a.5.5 0 0 1-.18-.69Z" opacity=".5" />
    <path d="M9.55 10.33a.5.5 0 0 1 .7.11l1.76 2.43a.5.5 0 1 1-.8.59l-1.77-2.43a.5.5 0 0 1 .11-.7Z" opacity=".55" />
    <path d="M8.23 10.92a.5.5 0 0 1 .59.39l.62 2.93a.5.5 0 1 1-.98.2l-.62-2.92a.5.5 0 0 1 .39-.6Z" opacity=".6" />
    <path d="M6.77 10.92a.5.5 0 0 1 .39.6l-.63 2.93a.5.5 0 0 1-.98-.2l.63-2.94a.5.5 0 0 1 .6-.39Z" opacity=".65" />
    <path d="M5.45 10.33a.5.5 0 0 1 .1.7L3.8 13.46a.5.5 0 0 1-.8-.59l1.75-2.43a.5.5 0 0 1 .7-.1Z" opacity=".7" />
    <path d="M4.47 9.25a.5.5 0 0 1-.18.68l-2.6 1.5a.5.5 0 0 1-.5-.87l2.6-1.5a.5.5 0 0 1 .68.19Z" opacity=".75" />
    <path d="M4.02 7.87a.5.5 0 0 1-.44.55l-2.98.3a.5.5 0 0 1-.1-1l2.97-.3a.5.5 0 0 1 .55.45Z" opacity=".8" />
    <path d="M4.18 6.42a.5.5 0 0 1-.63.32L.7 5.8a.5.5 0 1 1 .3-.95l2.86.93c.26.08.4.37.32.63Z" opacity=".85" />
    <path d="M4.9 5.16a.5.5 0 0 1-.7.04L1.97 3.19a.5.5 0 1 1 .67-.74l2.23 2c.2.19.22.5.03.7Z" opacity=".9" />
    <path d="M6.08 4.3a.5.5 0 0 1-.66-.25L4.2 1.31a.5.5 0 1 1 .91-.4l1.22 2.73a.5.5 0 0 1-.25.66Z" opacity=".95" />
  </svg>
));

Loader.displayName = 'Loader';
