// @ts-nocheck
import { PlusIcon } from '@radix-ui/react-icons';
import { useFormik } from 'formik';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { z } from 'zod';
import { blockAdapter, BlockProps, EditBlockProps } from '..';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Input } from '../../components/Input';
import { Stack } from '../../components/Stack';
import { BlockBase } from '../../typings/page';
import { zodToFormik } from '../../utils/zodToFormik';
import { FormErrors } from '../../validators/constants';

import cls from './Link.module.scss';

interface LinkBlockDataSingle {
    url: string;
    text: string;
};

type LinkBlockData = LinkBlockDataSingle[];

export interface LinkBlockType extends BlockBase {
    type: 'link';
    data: LinkBlockData;
}

const singleLinkSchema = z.object({
    text: z.string().max(1024, FormErrors.TEXT_LENGTH),
    url: z.string().url(),
});

export const linkSchema = singleLinkSchema.array();

interface SingleLinkEditorProps {
    data: LinkBlockDataSingle;
    id: number;
    onChange: (id: number, data: LinkBlockDataSingle) => void;
};

export const SingleLinkEditor: React.FC<SingleLinkEditorProps> = ({ id, data, onChange }) => {
    const { t } = useTranslation('common');
    const { t: errorsT } = useTranslation('errors');

    const { getFieldProps, touched, errors, values } = useFormik<LinkBlockDataSingle>({
        initialValues: data,
        onSubmit: () => {},
        validationSchema: zodToFormik(linkSchema),
    });

    React.useEffect(() => onChange(id, values), [id, onChange, values]);

    return (
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
        </Stack>
    );
};

export const LinkBlockEditor: React.FC<EditBlockProps<LinkBlockData>> = ({ id, initialData, onSave, onCancel }) => {
    const { t } = useTranslation('common');
    const { t: errorsT } = useTranslation('errors');
    const [data, setData] = React.useState(initialData);

    const addLink = React.useCallback(() => {
        setData(v => [...v, blockAdapter.link.initialData[0]]);
    }, []);

    const editLink = React.useCallback((index: number, data: LinkBlockDataSingle) => setData(v => {
        const result = [...v];
        result[index] = data;
        return result;
    }), []);

    const onSubmit = React.useCallback(() => {
        const a = linkSchema.safeParse(data);
        if (a.success) {
            onSave(id, data);
        }
    }, [id, onSave, data]);

    const handleCancel = React.useCallback(() => onCancel(id), [onCancel, id]);

    return (
        <Stack gap={8} direction="column">
            {data.map((link, index) => (
                <Card key={index}>
                    <SingleLinkEditor
                        data={link}
                        id={index}
                        onChange={editLink}
                    />
                </Card>
            ))}
            <Button onClick={addLink} icon={<PlusIcon />}>{t('add')}</Button>
            <Stack gap={8} justifyContent="end">
                <Button onClick={handleCancel} variant="ghost">{t('cancel')}</Button>
                <Button onClick={onSubmit} type="submit">{t('save')}</Button>
            </Stack>
        </Stack>
    );
};

export const LinkBlock: React.FC<BlockProps<LinkBlockData>> = ({ data }) => (
    <div className={cls.root}>
        <Stack gap={8} wrap>
            {data.map((link, i) => (
                <a href={link.url} key={`link-${i}`} target="_blank" rel="noreferrer">
                    <Button variant="primary">{link.text}</Button>
                </a>
            ))}
        </Stack>
    </div>
);
