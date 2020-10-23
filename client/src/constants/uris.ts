import { PORT, BASE_URL, PROTOCOL } from './config';

export const BASE_URI = `${PROTOCOL}://${BASE_URL}:${PORT}`;

export const SIGN_IN = `${BASE_URI}/users/signin`;
export const SIGN_UP = `${BASE_URI}/users`;
