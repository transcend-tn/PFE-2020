import axios from '../config/axios';
import { FAVORITE } from '../constants/uris';


export const addFavoriteMutation = async (payload: any): Promise<string> => {
    const { data } = await axios.post(FAVORITE, payload);
    return data;
  };