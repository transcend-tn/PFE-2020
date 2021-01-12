import axios from '../config/axios';
import { REQUEST_BY_ID, REQUEST_DETAIL } from '../constants/uris';

export const getRequestById = async (key: any, id: string): Promise<any> => {
    const { data } = await axios.get(REQUEST_BY_ID(id));
    return data;
};

export const getRequestDetail = async (key: any, id: string): Promise<any> => {
    const { data } = await axios.get(REQUEST_DETAIL(id));
    return data;
};

export const createRequestMutation = async (payload: any): Promise<string> => {
    const { data } = await axios.post(REQUEST_BY_ID(payload.id), payload.body);
    return data;
  };

