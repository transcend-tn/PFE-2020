import { Action, action, thunk } from 'easy-peasy';
import { Thunk } from 'easy-peasy';
import { UserLogin, UserCreate } from '@tr/common';
import jwt from 'jsonwebtoken';

import { InjectionsModel } from './injections.model';

export interface UserModel {
  user: any;
  token: string;
  addUser: Action<UserModel, any>;
  addToken: Action<UserModel, any>;
  signUp: Thunk<UserModel, UserCreate, InjectionsModel, {}, Promise<void>>;
  signIn: Thunk<UserModel, UserLogin, InjectionsModel, {}, Promise<string>>;
}

export const userModel: UserModel = {
  user: undefined,
  token: localStorage.getItem('accessToken') || '',
  addUser: action((state, payload) => {
    state.user = payload;
  }),
  addToken: action((state, payload) => {
    const user = jwt.decode(payload.accessToken);
    localStorage.setItem('accessToken', JSON.stringify(payload));
    state.token = payload;
    state.user = user;
  }),
  signUp: thunk(async (actions, payload, { injections }) => {
    return await injections.usersService.signUp(payload);
  }),
  signIn: thunk(async (actions, payload, { injections }) => {
    const data = await injections.usersService.signIn(payload);
    actions.addToken(data);

    return data;
  }),
};
