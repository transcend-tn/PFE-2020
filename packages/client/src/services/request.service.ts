import axios from '../config/axios';
import { REQUEST_BY_ID } from '../constants/uris';

export const getRequestById = async (payload: string): Promise<any> => {
    const { data } = await axios.get(REQUEST_BY_ID(payload));
    return data;
};

export const createRequestMutation = async (payload: any): Promise<string> => {
    const { data } = await axios.post(REQUEST_BY_ID(payload.id), payload.body);
    return data;
  };

