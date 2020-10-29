import { UserCreate, UserLogin } from '@tr/common';

import axios from '../config/axios';
import { SIGN_IN, SIGN_UP, USER_BY_ID, USERS_EDIT, EDIT_PASSWORD } from '../constants/uris';

export const signIn = async (payload: UserLogin): Promise<any> => {
  const { data } = await axios.post(SIGN_IN, payload);
  return data;
};

export const signUp = async (payload: UserCreate): Promise<void> => {
  const { data } = await axios.post(SIGN_UP, payload);
  return data;
};

export const getUserById = async (payload: string): Promise<any> => {
  const { data } = await axios.get(USER_BY_ID(payload));
  return data;
};
export const editUserService = async ({ userId, payload }: any): Promise<string> => {
  const { data } = await axios.put(USERS_EDIT(userId), payload);
  return data;
};

export const changePassword = async ({ userId, payload }: any): Promise<string> => {
  const { data } = await axios.put(EDIT_PASSWORD(userId), payload);
  return data;
};
