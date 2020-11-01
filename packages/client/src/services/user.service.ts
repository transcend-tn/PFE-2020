import { UserCreate, UserLogin } from '@tr/common';

import axios from '../config/axios';
import { SIGN_IN, SIGN_UP, USER_BY_ID, USERS, EDIT_PASSWORD } from '../constants/uris';

export const signIn = async (payload: UserLogin): Promise<any> => {
  const { data } = await axios.post(SIGN_IN, payload);
  return data;
};

export const signUp = async (payload: UserCreate): Promise<void> => {
  const { data } = await axios.post(SIGN_UP, payload);
  return data;
};

export const getUserById = async (key: any, payload: string): Promise<any> => {
  const { data } = await axios.get(USER_BY_ID(payload));
  return data;
};
export const editUserService = async (payload: any): Promise<string> => {
  const { data } = await axios.put(USERS, payload);
  return data;
};

export const changePasswordService = async (payload: any): Promise<string> => {
  const { data } = await axios.put(EDIT_PASSWORD, payload);
  return data;
};
