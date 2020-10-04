import * as usersService from "../services/user.service";

export interface InjectionsModel {
  usersService: typeof usersService;
}

export const injectionsModel = {
  usersService: usersService,
};
