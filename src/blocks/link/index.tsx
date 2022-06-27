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

export const LinkBlockEditor: React.FC<EditBlockProps<LinkBlockData>> = ({ id, initialData, onSave, onCancel }) => {
    const { t } = useTranslation('common');
    const { t: errorsT } = useTranslation('errors');

    const onSubmit = React.useCallback((data: LinkBlockData) => {
        onSave(id, data);
    }, [id, onSave]);

    const { getFieldProps, touched, errors, handleSubmit } = useFormik<LinkBlockData>({
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
            <Button size="large" fullWidth variant="primary">{data.text}</Button>
        </a>
    </div>
);
