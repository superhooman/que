import { Session as SessionBase } from 'next-auth';

export interface Session extends SessionBase {
    id: string;
}
