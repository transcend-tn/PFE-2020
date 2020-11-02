import axios from '../config/axios';
import { FAVORITE, FAVORITE_BY_ID } from '../constants/uris';

export const addFavoriteMutation = async (payload: string): Promise<string> => {
  const { data } = await axios.post(FAVORITE, payload);
  return data;
};

export const removeFavoritetMutation = async (payload: string): Promise<string> => {
  const { data } = await axios.delete(FAVORITE_BY_ID(payload));
  return data;
};

export const getFavoriteById= async (payload: string): Promise<any> => {
  const { data } = await axios.get(FAVORITE_BY_ID(payload));
  return data;
};
