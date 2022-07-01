import React from 'react';

import cls from './SocialIcon.module.scss';

const BASE_URL = '/assets/socials/';

const getUrl = (icon: string) => `${BASE_URL}${icon}.svg`;

interface Props {
    icon: string;
}

export const SocialIcon: React.FC<Props> = ({ icon }) => {
    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img className={cls.root} src={getUrl(icon)} alt="Icon" />
    );
};
