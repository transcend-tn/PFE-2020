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
export const DOCUMENT_BY_OWNER = (id: string) => `/document/owner/${id}`;
export const COLLABORATION_REQUESTS = '/document/collaboration-requests';

export const FAVORITE = '/favorite';
export const FAVORITE_BY_ID = (id: string) => `/favorite/${id}`;

export const COMMENT = '/comment';
export const COMMENT_MESSAGE_ADD = (docId: string) => `/comment/document/${docId}`;
export const COMMENT_BY_DOC_ID = (id: string) => `/comment/document/${id}`;

export const REQUEST_COMMENT_ADD = (reqId: string) => `/comment/request/${reqId}`;
export const REQUEST_BY_REQ_ID = (id: string) => `/comment/request/${id}`;

export const COLLABORATION_BY_ID= (id: string) => `/collaboration/${id}`;
export const JOIN_TEAM = (docId: string) => `/collaboration/${docId}`;
export const ENABLE = (docId: string, userId: string) => `/collaboration/enable/${docId}/${userId}`;
export const DISABLE = (docId: string, userId: string) => `/collaboration/disable/${docId}/${userId}`;

export const REQUEST = '/request';
export const REQUEST_BY_ID = (id: string) => `/request/${id}`;

