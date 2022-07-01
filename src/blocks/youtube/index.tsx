import clsx from 'clsx';
import { useFormik } from 'formik';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { z } from 'zod';
import { BlockProps, EditBlockProps } from '..';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Stack } from '../../components/Stack';
import { BlockBase } from '../../typings/page';
import { zodToFormik } from '../../utils/zodToFormik';

import cls from './YouTube.module.scss';

const getId = (url: string) => url.match(YOUTUBE_REGEX)?.[1] || '';

const getEmbedUrl = (id: string) => `https://www.youtube.com/embed/${id}`;

const YOUTUBE_REGEX = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;

interface YouTubeBlockData {
    url: string;
}

export interface YouTubeBlockType extends BlockBase {
    type: 'youtube';
    data: YouTubeBlockData;
}

export const youtubeSchema = z.object({
    url: z.string().regex(YOUTUBE_REGEX),
});

export const YouTubeBlockEditor: React.FC<EditBlockProps<YouTubeBlockData>> = ({ id, initialData, onSave, onCancel }) => {
    const { t } = useTranslation('common');
    const { t: errorsT } = useTranslation('errors');

    const onSubmit = React.useCallback((data: YouTubeBlockData) => {
        onSave(id, {
            url: getEmbedUrl(getId(data.url)),
        });
    }, [id, onSave]);

    const { handleSubmit, getFieldProps, touched, errors } = useFormik<YouTubeBlockData>({
        initialValues: initialData,
        onSubmit,
        validationSchema: zodToFormik(youtubeSchema),
    });

    const handleCancel = React.useCallback(() => onCancel(id), [onCancel, id]);

    return (
        <form onSubmit={handleSubmit}>
            <Stack gap={8} direction="column">
                <Input
                    label={t('url')}
                    icon="youtube"
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

export const YouTubeBlock: React.FC<BlockProps<YouTubeBlockData>> = ({ data, preview }) => (
    <div className={clsx(cls.root, { [cls.preview]: preview })}>
        {preview ? (
            <div
                style={{
                    backgroundImage: `url(https://i.ytimg.com/vi_webp/${getId(data.url)}/hqdefault.webp)`,
                }}
                className={cls.poster}
            >
                <svg
                    height={36}
                    viewBox="0 0 68 48"
                >
                    <path d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#f00" />
                    <path d="M 45,24 27,14 27,34" fill="#fff" />
                </svg>
            </div>
        ) : (
            <iframe
                width="100%"
                height="100%"
                src={data.url}
                frameBorder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className={cls.iframe}
            />
        )}
    </div>
);
