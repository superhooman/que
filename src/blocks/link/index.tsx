import { Link2Icon } from '@radix-ui/react-icons';
import { useFormik } from 'formik';
import { useTranslation } from 'next-i18next';
import React, { ReactNode } from 'react';
import { z } from 'zod';
import { BlockProps, EditBlockProps } from '..';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Stack } from '../../components/Stack';
import { BlockBase } from '../../typings/page';
import { zodToFormik } from '../../utils/zodToFormik';
import { FormErrors } from '../../validators/constants';

import cls from './Link.module.scss';

interface LinkBlockData {
    url: string;
    text: string;
};

export interface LinkBlockType extends BlockBase {
    type: 'link';
    data: LinkBlockData;
}

export const linkSchema = z.object({
    text: z.string().max(1024, FormErrors.TEXT_LENGTH),
    url: z.string().url(),
});

const iconMap = [
    ['tiktok.com/', 'tiktok'],
    ['twitter.com/', 'twitter'],
    ['instagram.com/', 'instagram'],
    ['youtube.com/', 'youtube'],
    ['youtu.be/', 'youtube'],
    ['vk.com/', 'vk'],
    ['discord.com/', 'discord'],
    ['github.com/', 'github'],
    ['facebook.com/', 'facebook'],
    ['fb.com/', 'fb'],
    ['wa.me/', 'whatsapp'],
    ['whatsapp.com', 'whatsapp'],
    ['twitch.com/', 'twitch'],
    ['t.me/', 'telegram']
];

const getIconFromUrl = (url: string, fallback?: ReactNode) => {
    for (let [start, icon] of iconMap) {
        if (url.includes(start)) {
            return icon;
        }
    }
    return fallback;
};

export const LinkBlockEditor: React.FC<EditBlockProps<LinkBlockData>> = ({ id, initialData, onSave, onCancel }) => {
    const { t } = useTranslation('common');
    const { t: errorsT } = useTranslation('errors');

    const onSubmit = React.useCallback((data: LinkBlockData) => {
        onSave(id, data);
    }, [id, onSave]);

    const { getFieldProps, touched, errors, handleSubmit, values } = useFormik<LinkBlockData>({
        initialValues: initialData,
        onSubmit,
        validationSchema: zodToFormik(linkSchema),
    });

    const handleCancel = React.useCallback(() => onCancel(id), [onCancel, id]);

    return (
        <form onSubmit={handleSubmit}>
            <Stack gap={8} direction="column">
                <Input
                    label={t('text')}
                    error={touched.text && errors.text && errorsT(errors.text)}
                    {...getFieldProps('text')}
                />
                <Input
                    label={t('url')}
                    icon={getIconFromUrl(values.url, <Link2Icon />)}
                    error={touched.url && errors.url && errorsT(errors.url)}
                    {...getFieldProps('url')}
                />
                <Stack gap={8} justifyContent="end">
                    <Button onClick={handleCancel} variant="ghost">{t('cancel')}</Button>
                    <Button type="submit">{t('save')}</Button>
                </Stack>
            </Stack>
        </form>
    );
};

export const LinkBlock: React.FC<BlockProps<LinkBlockData>> = ({ data }) => (
    <div className={cls.root}>
        <a href={data.url} target="_blank" rel="noreferrer">
            <Button icon={getIconFromUrl(data.url)} size="large" fullWidth>{data.text}</Button>
        </a>
    </div>
);
