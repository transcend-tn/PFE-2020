import axios from '../config/axios';
import { DOCUMENT } from './../constants/uris';

export const documentCreateMutation = async (payload: any): Promise<string> => {
  const { data } = await axios.post(DOCUMENT, payload);
  return data;
};

export const getDocumentByOwner = async (): Promise<any> => {
  const { data } = await axios.get(DOCUMENT);
  return data;
};
