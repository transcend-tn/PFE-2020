import { CommentCreate } from '@tr/common';
import axios from '../config/axios';
import { COMMENT } from '../constants/uris';

export const addCommentMutation = async (payload: CommentCreate): Promise<string> => {
    const { data } = await axios.post(COMMENT, payload);
    return data;
};