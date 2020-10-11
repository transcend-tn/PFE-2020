import { createStore } from "easy-peasy";

import { injectionsModel } from "../models/injections.model";
import { userModel, UserModel } from "../models/user.model";

export interface StoreModel {
  user: UserModel;
}

const storeModel = {
  user: userModel,
};

const store = createStore(storeModel, { injections: injectionsModel });

// @ts-ignore
window.store = store;

export default store;
