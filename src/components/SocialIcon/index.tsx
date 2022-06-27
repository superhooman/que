import React from 'react';

const BASE_URL = 'https://unpkg.com/simple-icons@v7/icons/';

const getUrl = (icon: string) => `${BASE_URL}${icon}.svg`;

interface Props {
    icon: string;
}

export const SocialIcon: React.FC<Props> = ({ icon }) => {
    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={getUrl(icon)} alt="Icon" />
    );
};
