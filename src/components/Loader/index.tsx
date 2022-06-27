import clsx from 'clsx';
import React, { SVGProps } from 'react';

import cls from './Loader.module.scss';

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
    <path opacity=".5" d="M13.312 3.567a.5.5 0 0 1 .5.866l-2.598 1.5a.5.5 0 0 1-.5-.866l2.598-1.5Z"/>
    <path opacity=".95" d="M3.75 1.005a.5.5 0 0 0-.183.683l1.5 2.598a.5.5 0 1 0 .866-.5l-1.5-2.598a.5.5 0 0 0-.683-.183Z"/>
    <path opacity=".9" d="M1.188 4.433a.5.5 0 1 1 .5-.866l2.598 1.5a.5.5 0 1 1-.5.866l-2.598-1.5Z"/>
    <path opacity=".85" d="M0 7.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 0-1h-3a.5.5 0 0 0-.5.5Z"/>
    <path opacity=".8" d="M1.688 11.433a.5.5 0 0 1-.5-.866l2.598-1.5a.5.5 0 0 1 .5.866l-2.598 1.5Z"/>
    <path opacity=".75" d="M3.75 13.995a.5.5 0 0 0 .683-.183l1.5-2.598a.5.5 0 1 0-.866-.5l-1.5 2.598a.5.5 0 0 0 .183.683Z"/>
    <path opacity=".7" d="M8 14.5a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 1 0v3Z"/>
    <path opacity=".65" d="M11.25 13.995a.5.5 0 0 0 .183-.683l-1.5-2.598a.5.5 0 1 0-.866.5l1.5 2.598a.5.5 0 0 0 .683.183Z"/>
    <path opacity=".6" d="M13.812 10.567a.5.5 0 0 1-.5.866l-2.598-1.5a.5.5 0 0 1 .5-.866l2.598 1.5Z"/>
    <path opacity=".55" d="M15 7.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 .5-.5Z"/>
    <path opacity=".45" d="M11.25 1.005a.5.5 0 0 0-.683.183l-1.5 2.598a.5.5 0 0 0 .866.5l1.5-2.598a.5.5 0 0 0-.183-.683Z"/>
    <path d="M7.5 0a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 1 0v-3a.5.5 0 0 0-.5-.5Z"/>
  </svg>
));

Loader.displayName = 'Loader';
