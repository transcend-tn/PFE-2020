import { UserCreate, UserLogin } from '@tr/common';
import { Action, action, thunk, Thunk } from 'easy-peasy';
import jwt from 'jsonwebtoken';
import { InjectionsModel } from './injections.model';

export interface UserModel {
  user: any;
  token: string;
  addUser: Action<UserModel, any>;
  addToken: Action<UserModel, any>;
  signUp: Thunk<UserModel, UserCreate, InjectionsModel, {}, Promise<void>>;
  signIn: Thunk<UserModel, UserLogin, InjectionsModel, {}, Promise<any>>;
}

const token = JSON.parse(localStorage.getItem('accessToken') || '{}');

export const userModel: UserModel = {
  user: jwt.decode(token.accessToken),
  token: token,
  addToken: action((state, payload) => {
    localStorage.setItem('accessToken', JSON.stringify(payload));
    state.token = payload;
  }),
  addUser: action((state, payload) => {
    const user = jwt.decode(payload.accessToken);
    state.user = user;
  }),
  signUp: thunk(async (actions, payload, { injections }) => {
    return await injections.usersService.signUp(payload);
  }),
  signIn: thunk(async (actions, payload, { injections }) => {
    const data = await injections.usersService.signIn(payload);
    actions.addToken(data);
    actions.addUser(data);

    return data;
  }),
};
