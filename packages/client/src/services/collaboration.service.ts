import axios from '../config/axios';
import { COLLABORATION_BY_ID } from '../constants/uris';


export const collaborationTeam= async (payload: string): Promise<any> => {
    const { data } = await axios.get(COLLABORATION_BY_ID(payload));
    return data;
  };