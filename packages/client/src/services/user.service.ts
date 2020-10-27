import { UserCreate, UserLogin } from '@tr/common';

import axios from '../config/axios';
import { SIGN_IN, SIGN_UP, USERS } from '../constants/uris';

export const signIn = async (payload: UserLogin): Promise<string> => {
  const { data } = await axios.post(SIGN_IN, payload);
  return data;
};

export const signUp = async (payload: UserCreate): Promise<void> => {
  const { data } = await axios.post(SIGN_UP, payload);
  return data;
};

export const getUserById = async (): Promise<any> => {
  const { data } = await axios.get(USERS);
  return data;
};
