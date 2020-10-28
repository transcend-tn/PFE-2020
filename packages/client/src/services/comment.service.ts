import { CommentCreate } from '@tr/common';
import axios from '../config/axios';
import { COMMENT, COMMENT_BY_ID } from '../constants/uris';

export const addCommentMutation = async (payload: CommentCreate): Promise<string> => {
    const { data } = await axios.post(COMMENT, payload);
    return data;
};

export const getCommentById = async (payload: string): Promise<any> => {
    const { data } = await axios.get(COMMENT_BY_ID(payload));
    return data;
  };