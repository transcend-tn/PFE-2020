import { PORT, BASE_URL, PROTOCOL } from './config';

export const ENTRYPOINT = `${PROTOCOL}://${BASE_URL}:${PORT}`;

export const SIGN_IN = '/users/signin';
export const SIGN_UP = '/users';
export const USER_BY_ID = (id: string) => `/users'/${id}`;

export const DOCUMENT = '/document';
export const DOCUMENT_BY_ID = (id: string) => `/document/${id}`;