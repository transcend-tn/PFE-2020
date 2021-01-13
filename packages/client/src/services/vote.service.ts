import axios from '../config/axios';
import { VOTE } from '../constants/uris';

export const getVoteStats = async (key: any, id: string): Promise<any> => {
  const { data } = await axios.get(VOTE(id));
  return data;
};

export const addVote = async (id: string): Promise<any> => {
  const { data } = await axios.post(VOTE(id));
  return data;
};

export const cancelVote = async (id: string): Promise<any> => {
  const { data } = await axios.delete(VOTE(id));
  return data;
};

