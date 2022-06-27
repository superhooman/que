interface ErrorType<Error> {
    status: number;
    code: Error;
}

export enum Error {
    DEFAULT = 'default',
    FORM_ERROR = 'formError',
    EXISTS = 'exists',
    UNAUTHORIZED = 'unauthorized',
}

export const ERRORS: Record<Error, ErrorType<Error>> = {
    [Error.DEFAULT]: {
        status: 500,
        code: Error.DEFAULT,
    },
    [Error.FORM_ERROR]: {
        status: 400,
        code: Error.FORM_ERROR,
    },
    [Error.EXISTS]: {
        status: 409,
        code: Error.EXISTS,
    },
    [Error.UNAUTHORIZED]: {
        status: 403,
        code: Error.UNAUTHORIZED,
    }
};
