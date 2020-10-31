import { PORT, BASE_URL, PROTOCOL } from './config';

export const ENTRYPOINT = `${PROTOCOL}://${BASE_URL}:${PORT}`;

export const SIGN_IN = '/users/signin';
export const SIGN_UP = '/users';
export const USER_BY_ID = (id: string) => `/users/${id}`;
export const USERS = '/users';
export const EDIT_PASSWORD = `/users/change-password`;

export const DOCUMENT = '/document';
export const DOCUMENT_BY_ID = (id: string) => `/document/${id}`;
export const DOCUMENT_EDIT = (id: string) => `/document/${id}/edit`;

export const FAVORITE = '/favorite';
export const FAVORITE_BY_ID = (id: string) => `/favorite/${id}`;

export const COMMENT = '/comment';
export const COMMENT_MESSAGE_ADD = (docId: string) => `/comment/${docId}`;
export const COMMENT_BY_DOC_ID = (id: string) => `/comment/document/${id}`;

export const COLLABORATION_BY_ID= (id: string) => `/collaboration/${id}`;

export const REQUEST = '/request';
export const REQUEST_BY_ID = (id: string) => `/request/${id}`;

