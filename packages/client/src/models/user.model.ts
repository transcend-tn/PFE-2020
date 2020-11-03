import { Action, action } from 'easy-peasy';
import jwt from 'jsonwebtoken';

export interface UserModel {
  user: any;
  accessToken: string;
  addUser: Action<UserModel, any>;
  addToken: Action<UserModel, string>;
}

const accessToken = localStorage.getItem('accessToken') || '';

export const userModel: UserModel = {
  user: jwt.decode(accessToken),
  accessToken: accessToken,
  addToken: action((state, payload) => {
    localStorage.setItem('accessToken', payload);
    state.accessToken = payload;
  }),
  addUser: action((state, payload) => {
    state.user = payload;
  }),
};
