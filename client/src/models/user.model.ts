import { Action, action, thunk } from 'easy-peasy';
import { Thunk } from 'easy-peasy';
import { SignInPayload } from '../interfaces/signIn.interface';
import { SignUpPayload } from '../interfaces/signup.interface';

import { InjectionsModel } from './injections.model';

export interface UserModel {
  item: any;
  token: string;
  addUser: Action<UserModel, any>;
  addToken: Action<UserModel, any>;
  signUp: Thunk<UserModel, SignUpPayload, InjectionsModel, {}, Promise<void>>;
  signIn: Thunk<UserModel, SignInPayload, InjectionsModel, {}, Promise<string>>;
}

export const userModel: UserModel = {
  item: undefined,
  token: localStorage.getItem('accessToken') || '',
  addUser: action((state, payload) => {
    state.item = payload;
  }),
  addToken: action((state, payload) => {
    localStorage.setItem('accessToken', JSON.stringify(payload));
    state.token = payload;
  }),
  signUp: thunk(async (actions, payload, { injections }) => {
    const data = await injections.usersService.signUp(payload);

    actions.addUser(data);
  }),
  signIn: thunk(async (actions, payload, { injections }) => {
    const data = await injections.usersService.signIn(payload);
    actions.addToken(data);

    return data;
  }),
};
