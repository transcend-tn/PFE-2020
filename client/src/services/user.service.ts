import { SIGN_IN, SIGN_UP } from "../constants/uris";
import axios from "axios";
import { SignUpPayload } from "../interfaces/signup.interface";
import { SignInPayload } from "../interfaces/signIn.interface";

export const signIn = async (payload: SignInPayload): Promise<string> => {
  const { data } = await axios.post(SIGN_IN, payload);
  return data;
};

export const signUp = async (payload: SignUpPayload): Promise<void> => {
  const { data } = await axios.post(SIGN_UP, payload);
  return data;
};
