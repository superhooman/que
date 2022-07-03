interface Options {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    body?: RequestInit['body'];
    json?: boolean;
    headers?: RequestInit['headers'];
}

class ClientAPI {
    private BASE: string;

    constructor() {
        this.BASE = '/api/';
    }

    public makeRequest(path: string, options: Options = { method: 'GET', headers: {} }) {
        const headers: HeadersInit = {
            ...options.headers,
            ...(options.json ? { 'Content-Type': 'application/json' } : {}),
        };

        const body = (
            options.json ? JSON.stringify(options.body) : options.body
        );

        return fetch(this.BASE + path, {
            method: options.method,
            body,
            headers,
        });
    }

    public emailAuth(email: string, csrfToken?: string) {
        const form = new URLSearchParams();
        form.append('email', email);
        csrfToken && form.append('csrfToken', csrfToken);
        form.append('json', 'true');
        return this.makeRequest('auth/signin/email', {
            method: 'POST',
            body: form,
        });
    }
}

export const API = new ClientAPI();
