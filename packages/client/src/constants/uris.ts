import { PORT, BASE_URL, PROTOCOL, PORT_FRONT } from './config';

export const ENTRYPOINT = `${PROTOCOL}://${BASE_URL}:${PORT}`;
export const HOME_PAGE = 'http://localhost:3001';

export const PROFILE = (id: string) => `/profile/${id}`;
export const SIGN_IN = '/users/signin';
export const SIGN_UP = '/users';
export const USER_BY_ID = (id: string) => `/users/${id}`;
export const USER_BY_USERNAME = (username: string) => `/users/username/${username}`;
export const USERS = '/users';
export const EDIT_PASSWORD = `/users/change-password`;

export const DOCUMENT = '/document';
export const DOCUMENT_BY_ID = (id: string) => `/document/${id}`;
export const DOCUMENT_EDIT = (id: string) => `/document/edit/${id}`;
export const DOCUMENT_BY_OWNER = (id: string) => `/document/owner/${id}`;
export const COLLABORATION_REQUESTS = '/document/collaboration-requests';
export const DOCUMENT_HISTORY = (id: string) => `/document/history/${id}`;
export const DOCUMENT_SNAPSHOT = (docId: string, histId: string) => `/document/${docId}/${histId}`;

export const FAVORITE = '/favorite';
export const FAVORITE_BY_ID = (id: string) => `/favorite/${id}`;

export const COMMENT = '/comment';
export const COMMENT_MESSAGE_ADD = (docId: string) => `/comment/document/${docId}`;
export const COMMENT_BY_DOC_ID = (id: string) => `/comment/document/${id}`;

export const REQUEST_COMMENT_ADD = (reqId: string) => `/comment/request/${reqId}`;
export const REQUEST_BY_REQ_ID = (id: string) => `/comment/request/${id}`;

export const COLLABORATION = (userId: string) => `/collaboration/documents/${userId}`;
export const COLLABORATION_BY_ID = (id: string) => `/collaboration/${id}`;
export const JOIN_TEAM = (docId: string) => `/collaboration/${docId}`;
export const LEAVE_TEAM = (docId: string) => `/collaboration/${docId}`;
export const ENABLE = (docId: string, userId: string) => `/collaboration/enable/${docId}/${userId}`;
export const DISABLE = (docId: string, userId: string) => `/collaboration/disable/${docId}/${userId}`;
export const REMOVE = (docId: string, userId: string) => `/collaboration/remove/${docId}/${userId}`;

export const REQUEST = '/request';
export const REQUEST_BY_ID = (id: string) => `/request/${id}`;
export const REQUEST_DETAIL = (id: string) => `/request/detail/${id}`;

export const VOTE = (id: string) => `/vote/${id}`;
