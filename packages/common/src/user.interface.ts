export interface UserCreate {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface UserLogin {
  username: string;
  password: string;
}

export interface UserChangePassword {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UserEdit {
  fname: string;
  lname: string;
  email: string;
}
