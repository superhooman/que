import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import React from 'react';
import { Button } from '../../components/Button';
import { Column } from '../../components/Column';
import { Container } from '../../components/Container';
import { Space } from '../../components/Space';
import { Stack } from '../../components/Stack';
import { Text, Title } from '../../components/Typography';
import { HOST } from '../../constants';
import { Page } from '../../typings/page';
import { trpc } from '../../utils/trcp';
import { BlockEditor } from '../BlockEditor';
import { BlockRenderer } from '../BlockRenderer';
import { Header } from './components/Header';
import { Screens } from './components/Screens';

interface Props {
    page: Page;
}

export const PageEditor: React.FC<Props> = ({ page }) => {
    const { t } = useTranslation('common');
    const [data, setData] = React.useState(page.blocks || []);
    const { mutate, isLoading } = trpc.useMutation(['page.update']);

    const save = React.useCallback(() => {
        mutate({
            slug: page.slug,
            blocks: data,
        });
    }, [data, page.slug, mutate]);

    return (
        <Screens
            editor={(
                <>
                    <Header>
                        <Stack alignItems="center" justifyContent="space-between">
                            <Link href={`https://${HOST}/${page.slug}`}>
                                <a target="_blank">
                                    <Text size="md" type="secondary">{HOST}/</Text>
                                    <Text size="md">{page.slug}</Text>
                                </a>
                            </Link>
                            <Button
                                variant="primary"
                                disabled={isLoading || data.length < 1}
                                loading={isLoading}
                                onClick={save}
                            >
                                {t('save')}
                            </Button>
                        </Stack>
                    </Header>
                    <Container size="sm">
                        <Space size={24} />
                        <BlockEditor
                            blocks={data}
                            onChange={setData}
                        />
                        <Space size={24} />
                    </Container>
                </>
            )}
            preview={(
                <>
                    <Header>
                        <Stack justifyContent="space-between" alignItems="center">
                            <Text type="secondary" size="sm">{t('preview')}</Text>
                            <Link href="/dashboard/page" passHref>
                                <Button target="_blank">{t('open')}</Button>
                            </Link>
                        </Stack>
                    </Header>
                    <Container size="sm">
                        <Space size={24} />
                        <BlockRenderer
                            blocks={data}
                        />
                        <Space size={24} />
                    </Container>
                </>
            )}
        />
    );
};
