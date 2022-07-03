import { NextPage } from 'next';

import { Paragraph, Title } from '@src/components/Typography';
import { SmallLayout } from '@src/layout/Small';

interface Props {
    statusCode?: number;
}

const codeToError: Record<number, string> = {
    404: 'Not Found',
    500: 'Something went wrong',
};

const Error: NextPage<Props> = ({ statusCode = 404 }) => {
    return (
        <>
            <SmallLayout>
                <div style={{
                    textAlign: 'center',
                }}>
                    {statusCode ? <Title>{statusCode}</Title> : null}
                    <Paragraph>{codeToError[statusCode || 500]}</Paragraph>
                </div>
            </SmallLayout>
        </>
    );
};

export default Error;
