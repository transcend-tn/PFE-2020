import axios from '../config/axios';
import { COLLABORATION_BY_ID, ENABLE, JOIN_TEAM, DISABLE } from '../constants/uris';


export const collaborationTeam= async (key: any, docId: string): Promise<any> => {
    const { data } = await axios.get(COLLABORATION_BY_ID(docId));
    return data;
};

export const joinTeamMutation = async ( docId : any): Promise<any> => {
  const { data } = await axios.post(JOIN_TEAM(docId));
  return data;
}

export const leaveTeamMutation = async (payload: any): Promise<string> => {
  const { data } = await axios.delete(COLLABORATION_BY_ID(payload));
  return data;
};

export const enableMutation = async ({ docId, userId, payload }: any ): Promise<string> => {
  const { data } = await axios.put(ENABLE(docId, userId), payload);
  return data;
};

export const disableMutation = async ({ docId, userId, payload }: any ): Promise<string> => {
  const { data } = await axios.put(DISABLE(docId, userId), payload);
  return data;
};


