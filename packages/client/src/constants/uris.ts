import { PORT, BASE_URL, PROTOCOL } from './config';

export const ENTRYPOINT = `${PROTOCOL}://${BASE_URL}:${PORT}`;

export const SIGN_IN = '/users/signin';
export const SIGN_UP = '/users';

export const DOCUMENT = '/document';
