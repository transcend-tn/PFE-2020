import axios from '../config/axios';
import { COMMENT_MESSAGE_ADD, COMMENT_BY_DOC_ID } from '../constants/uris';

export const addCommentMutation = async ({ docId, payload }: any): Promise<string> => {
  const { data } = await axios.post(COMMENT_MESSAGE_ADD(docId), payload);
  return data;
};

export const getCommentByDocId = async (key: any, docId: string): Promise<any> => {
  const { data } = await axios.get(COMMENT_BY_DOC_ID(docId));
  return data;
};
