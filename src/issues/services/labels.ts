import { githubApi } from '../../api';
import { Label } from '../interfaces';

export const getLabels = async () => {
  const { data } = await githubApi.get<Label[]>('/labels');
  return data;
};
