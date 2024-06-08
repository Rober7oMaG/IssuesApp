import { githubApi } from '../api';
import { Label } from '../interfaces';

export const getLabels = async () => {
  const { data } = await githubApi.get<Label[]>('/labels?per_page=100');
  return data;
};
