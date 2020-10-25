import { SIGN_IN, SIGN_UP } from '../constants/uris';
import axios from 'axios';
import { UserLogin, UserCreate } from '@tr/common';

export const signIn = async (payload: UserLogin): Promise<string> => {
  const { data } = await axios.post(SIGN_IN, payload);
  return data;
};

export const signUp = async (payload: UserCreate): Promise<void> => {
  const { data } = await axios.post(SIGN_UP, payload);
  return data;
};
