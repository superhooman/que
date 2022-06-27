import { NextPage } from 'next';
import { Paragraph, Title } from '../components/Typography';
import { AuthLayout } from '../layout/Auth';

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
            <AuthLayout>
                <div style={{
                    textAlign: 'center',
                }}>
                    {statusCode ? <Title>{statusCode}</Title> : null}
                    <Paragraph>{codeToError[statusCode || 500]}</Paragraph>
                </div>
            </AuthLayout>
        </>
    );
};

export default Error;