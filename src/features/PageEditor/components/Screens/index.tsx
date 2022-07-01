import { useTranslation } from 'next-i18next';
import React, { ReactNode } from 'react';
import { Button } from '../../../../components/Button';
import { Column } from '../../../../components/Column';
import { Stack } from '../../../../components/Stack';

import cls from './Screens.module.scss';

interface Props {
    editor: ReactNode;
    preview: ReactNode;
}

type Screen = 'editor' | 'preview';

export const Screens: React.FC<Props> = ({ editor, preview }) => {
    const { t } = useTranslation('common');
    const [screen, setScreen] = React.useState<Screen>('editor');

    const setEditor = React.useCallback(() => setScreen('editor'), []);
    const setPreview = React.useCallback(() => setScreen('preview'), []);

    const getButtonVariant = React.useCallback((s: Screen) => screen === s ? 'primary' : 'ghost', [screen]);

    return (
        <>
            <Stack
                data-screen={screen}
                className={cls.root}
                alignItems="start"
                equalStretch
            >
                <Column className={cls.editor} stretch>
                    {editor}
                </Column>
                <Column className={cls.preview}>
                    {preview}
                </Column>
            </Stack>
            <div className={cls.menu}>
                <Stack gap={4}>
                    <Button
                        onClick={setEditor}
                        className={cls.button}
                        variant={getButtonVariant('editor')}
                    >
                        {t('editor')}
                    </Button>
                    <Button
                        onClick={setPreview}
                        className={cls.button}
                        variant={getButtonVariant('preview')}
                    >
                        {t('preview')}
                    </Button>
                </Stack>
            </div>
        </>
    );
};
