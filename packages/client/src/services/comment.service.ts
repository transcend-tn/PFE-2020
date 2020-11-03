import axios from '../config/axios';
import { COMMENT_MESSAGE_ADD, COMMENT_BY_DOC_ID, REQUEST_COMMENT_ADD, REQUEST_BY_REQ_ID } from '../constants/uris';

export const addCommentMutation = async ({ docId, payload }: any): Promise<string> => {
  const { data } = await axios.post(COMMENT_MESSAGE_ADD(docId), payload);
  return data;
};

export const getCommentByDocId = async (key: any, docId: string): Promise<any> => {
  const { data } = await axios.get(COMMENT_BY_DOC_ID(docId));
  return data;
};

export const addrequestCommentMutation = async ({ reqId, payload }: any): Promise<string> => {
  const { data } = await axios.post(REQUEST_COMMENT_ADD(reqId), payload);
  return data;
};

export const getCommentByReqId = async (key: any, reqId: string): Promise<any> => {
  const { data } = await axios.get(REQUEST_BY_REQ_ID((reqId)));
  return data;
};