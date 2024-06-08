import { githubApi } from '@api';
import { delay } from '@helpers';
import { State, Issue } from '@interfaces';

export const getIssues = async (labels: string[] = [], state?: State) => {
  await delay(2);

  const params = new URLSearchParams();

  if (state) params.append('state', state);
  if (labels.length) params.append('labels', labels.join(','));

  params.append('page', '1');
  params.append('per_page', '5');

  const { data } = await githubApi.get<Issue[]>('/issues', { params });
  return data;
};

export const getIssueByNumber = async (issueNumber: number) => {
  await delay(2);

  const { data } = await githubApi.get<Issue>(`/issues/${issueNumber}`);
  return data;
};

export const getIssueComments = async (issueNumber: number) => {
  await delay(2);

  const { data } = await githubApi.get<Issue[]>(
    `/issues/${issueNumber}/comments`,
  );
  return data;
};
