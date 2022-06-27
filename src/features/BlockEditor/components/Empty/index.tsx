import { useTranslation } from 'next-i18next';
import { Card } from '../../../../components/Card';
import { Stack } from '../../../../components/Stack';
import { Text } from '../../../../components/Typography';

export const Empty: React.FC = () => {
    const { t } = useTranslation('common');

    return (
        <Card>
            <Stack style={{
                height: 64
            }} direction="column" justifyContent="center" alignItems="center" gap={8}>
                <Text size="sm" type="secondary">{t('empty')}</Text>
                <Text size="xs" type="secondary">{t('addBlock')}</Text>
            </Stack>
        </Card>
    );
};
