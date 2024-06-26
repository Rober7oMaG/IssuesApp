import { githubApi } from '@api';
import { delay } from '@helpers';
import { State, Issue } from '@interfaces';

type GetIssuesRequest = {
  state?: State;
  labels: string[];
  page: number;
};

type GetInfiniteIssuesRequest = Omit<GetIssuesRequest, 'page'>;

type InfiniteQueryProps = {
  pageParam: number;
  queryKey: (string | GetInfiniteIssuesRequest)[];
};

export const getIssues = async ({ state, labels, page }: GetIssuesRequest) => {
  await delay(2);

  const params = new URLSearchParams();

  if (state) params.append('state', state);
  if (labels.length) params.append('labels', labels.join(','));

  params.append('page', page.toString());
  params.append('per_page', '5');

  const { data } = await githubApi.get<Issue[]>('/issues', { params });
  return data;
};

export const getInfiniteIssues = async ({
  pageParam,
  queryKey,
}: InfiniteQueryProps) => {
  const [, , args] = queryKey;
  const { state, labels } = args as GetIssuesRequest;

  const params = new URLSearchParams();

  if (state) params.append('state', state);
  if (labels.length) params.append('labels', labels.join(','));

  params.append('page', pageParam.toString());
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
