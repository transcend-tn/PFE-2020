import axios from '../config/axios';
import { COLLABORATION_BY_ID, ENABLE, JOIN_TEAM, DISABLE, REMOVE, LEAVE_TEAM, COLLABORATION } from '../constants/uris';


export const collaborationTeam= async (key: any, docId: string): Promise<any> => {
    const { data } = await axios.get(COLLABORATION_BY_ID(docId));
    return data;
};

export const joinTeamMutation = async (docId : any): Promise<any> => {
  const { data } = await axios.post(JOIN_TEAM(docId));
  return data;
}

export const leaveTeamMutation = async (docId: any): Promise<string> => {
  const { data } = await axios.delete(LEAVE_TEAM(docId));
  return data;
};

export const enableMutation = async ({ docId, userId }: any ): Promise<string> => {
  const { data } = await axios.put(ENABLE(docId, userId));
  return data;
};

export const disableMutation = async ({ docId, userId}: any ): Promise<string> => {
  const { data } = await axios.put(DISABLE(docId, userId));
  return data;
};

export const removeMutation = async ({ docId, userId}: any ): Promise<string> => {
  const { data } = await axios.delete(REMOVE(docId, userId));
  return data;
};

export const documentsCollab= async  (key: any, userId : any ): Promise<any> => {
  const { data } = await axios.get(COLLABORATION(userId));
  return data;
};


