import { useFormik } from 'formik';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { z } from 'zod';
import { BlockProps, EditBlockProps } from '..';
import { Button } from '../../components/Button';
import { Input, TextArea } from '../../components/Input';
import { Stack } from '../../components/Stack';
import { Paragraph, Title } from '../../components/Typography';
import { BlockBase } from '../../typings/page';
import { zodToFormik } from '../../utils/zodToFormik';
import { FormErrors } from '../../validators/constants';

import cls from './Text.module.scss';

interface TextBlockData {
    title?: string;
    text: string;
}

export interface TextBlockType extends BlockBase {
    type: 'text';
    data: TextBlockData;
}

export const textSchema = z.object({
    title: z.string().optional(),
    text: z.string().max(1024, FormErrors.TEXT_LENGTH),
});

export const TextBlockEditor: React.FC<EditBlockProps<TextBlockData>> = ({ id, initialData, onSave, onCancel }) => {
    const { t } = useTranslation('common');
    const { t: errorsT } = useTranslation('errors');

    const onSubmit = React.useCallback((data: TextBlockData) => {
        onSave(id, data);
    }, [id, onSave]);

    const { handleSubmit, getFieldProps, touched, errors } = useFormik<TextBlockData>({
        initialValues: initialData,
        onSubmit,
        validationSchema: zodToFormik(textSchema),
    });

    const handleCancel = React.useCallback(() => onCancel(id), [onCancel, id]);

    return (
        <form onSubmit={handleSubmit}>
            <Stack gap={8} direction="column">
                <Input
                    label={`${t('title')} (${t('optional')})`}
                    error={touched.title && errors.title && errorsT(errors.title)}
                    {...getFieldProps('title')}
                />
                <TextArea
                    label={t('text')}
                    error={touched.text && errors.text && errorsT(errors.text)}
                    {...getFieldProps('text')}
                />
                <Stack gap={8} justifyContent="end">
                    <Button onClick={handleCancel} variant="ghost">{t('cancel')}</Button>
                    <Button type="submit">{t('save')}</Button>
                </Stack>
            </Stack>
        </form>
    );
};

export const TextBlock: React.FC<BlockProps<TextBlockData>> = ({ data }) => (
    <div className={cls.root}>
        {data.title && <Title>{data.title}</Title>}
        <Paragraph noMargin>{data.text}</Paragraph>
    </div>
);
