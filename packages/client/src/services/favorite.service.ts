import axios from '../config/axios';
import { FAVORITE_REMOVE, FAVORITE_ADD } from '../constants/uris';

export const addFavoriteMutation = async ({ docId, payload }: any): Promise<string> => {
  const { data } = await axios.post(FAVORITE_ADD(docId), payload);
  return data;
};

  export const removeFavoritetMutation = async ({ docId, payload }: any): Promise<string> => {
    const { data } = await axios.post(FAVORITE_REMOVE(docId), payload);
    return data;
  };
