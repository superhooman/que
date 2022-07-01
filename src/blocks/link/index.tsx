import { LinkIcon } from '@heroicons/react/solid';
import { useFormik } from 'formik';
import { useTranslation } from 'next-i18next';
import React, { ReactNode } from 'react';
import { z } from 'zod';
import { BlockProps, EditBlockProps } from '..';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Stack } from '../../components/Stack';
import { Swatch } from '../../components/Swatch';
import { BlockBase } from '../../typings/page';
import { zodToFormik } from '../../utils/zodToFormik';
import { FormErrors } from '../../validators/constants';

import cls from './Link.module.scss';

const variantSchema = z.enum(['default', 'primary']);

type Variant = z.infer<typeof variantSchema>;

interface LinkBlockData {
    url: string;
    text: string;
    variant?: Variant;
};

export interface LinkBlockType extends BlockBase {
    type: 'link';
    data: LinkBlockData;
}

export const linkSchema = z.object({
    text: z.string().max(1024, FormErrors.TEXT_LENGTH),
    variant: variantSchema.optional(),
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
    ['fb.com/', 'facebook'],
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

    const { getFieldProps, touched, errors, handleSubmit, values, setFieldValue } = useFormik<LinkBlockData>({
        initialValues: initialData,
        onSubmit,
        validationSchema: zodToFormik(linkSchema),
    });

    const handleSwatchChange = React.useCallback((value: string) => setFieldValue('variant', value), [setFieldValue]);

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
                    icon={getIconFromUrl(values.url, <LinkIcon />)}
                    error={touched.url && errors.url && errorsT(errors.url)}
                    {...getFieldProps('url')}
                />
                <Swatch
                    onChange={handleSwatchChange}
                    items={[
                        {
                            value: 'default',
                            label: t('button.default'),
                        },
                        {
                            value: 'primary',
                            label: t('button.primary'),
                        }
                    ]}
                    label={t('variant')}
                    value={values.variant || 'default'}
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
        <Button
            href={data.url}
            target="_blank"
            icon={getIconFromUrl(data.url)}
            size="large"
            variant={data.variant}
            fullWidth
        >
            {data.text}
        </Button>
    </div>
);
