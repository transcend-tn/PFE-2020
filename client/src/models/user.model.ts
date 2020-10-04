import { Action, action, thunk } from "easy-peasy";
import { Thunk } from "easy-peasy";

import { InjectionsModel } from "./injections.model";

export interface UserModel {
  items: any[];
  addUsers: Action<UserModel, any[]>;
  fetchUsers: Thunk<UserModel, void, InjectionsModel>;
}

export const userModel: UserModel = {
  items: [],
  addUsers: action((state, payload) => {
    state.items = payload;
  }),
  fetchUsers: thunk(async (actions, payload, { injections }) => {
    const data = await injections.usersService.findAll();

    actions.addUsers(data);
  }),
};
