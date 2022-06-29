import { SVGProps } from 'react';

interface BaseSvgProps extends SVGProps<SVGSVGElement> {
    size: number;
    originalSize: number;
}

export interface IconProps extends SVGProps<SVGSVGElement> {
    size?: number;
}

export const BaseSvg: React.FC<BaseSvgProps> = ({ size, originalSize, ...props }) => (
    <svg
        width={size}
        height={size}
        viewBox={`0 0 ${originalSize} ${originalSize}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    />
);

export * from './icons';
