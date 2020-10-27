import axios from '../config/axios';
import { DOCUMENT, DOCUMENT_BY_ID } from './../constants/uris';

export const documentCreateMutation = async (payload: any): Promise<string> => {
  const { data } = await axios.post(DOCUMENT, payload);
  return data;
};

export const getDocumentByOwner = async (): Promise<any> => {
  const { data } = await axios.get(DOCUMENT);
  return data;
};

export const getDocumentById = async (payload: string): Promise<any> => {
  const { data } = await axios.get(DOCUMENT_BY_ID(payload));
  return data;
};

export const deleteDocumentMutation = async (payload: any): Promise<string> => {
  const { data } = await axios.delete(DOCUMENT, payload);
  return data;
};
