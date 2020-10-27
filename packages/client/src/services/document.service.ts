import axios from '../config/axios';
import { DOCUMENT, DOCUMENT_BY_ID } from './../constants/uris';

export const createDocumentMutation = async (payload: any): Promise<string> => {
  const { data } = await axios.post(DOCUMENT, payload);
  return data;
};

export const getDocumentsByOwner = async (): Promise<any> => {
  const { data } = await axios.get(DOCUMENT);
  return data;
};

export const getDocumentById = async (payload: string): Promise<any> => {
  console.log('payload: ', payload);
  const { data } = await axios.get(DOCUMENT_BY_ID(payload));
  console.log('data: ', data);
  return data;
};

export const deleteDocumentMutation = async (payload: any): Promise<string> => {
  const { data } = await axios.delete(DOCUMENT_BY_ID(payload));
  return data;
};
export const updateDocumentMutation = async (payload: any): Promise<string> => {
  const { data } = await axios.put(DOCUMENT, payload);
  return data;
};
