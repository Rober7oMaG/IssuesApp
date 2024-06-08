import { useQuery } from '@tanstack/react-query';

import { State } from '@issues/interfaces';
import {
  getIssueByNumber,
  getIssueComments,
  getIssues,
} from '@issues/services';

type useIssuesQueryProps = {
  state?: State;
  labels?: string[];
};

export const useIssuesQuery = ({ state, labels }: useIssuesQueryProps) => {
  return useQuery({
    queryKey: ['issues', { state, labels }],
    queryFn: () => getIssues(labels, state),
    staleTime: 1000 * 60 * 15, // 15 minutes
    refetchOnWindowFocus: false,
  });
};

export const useIssueByNumberQuery = (issueNumber: number) => {
  return useQuery({
    queryKey: ['issue', issueNumber],
    queryFn: () => getIssueByNumber(issueNumber),
    refetchOnWindowFocus: false,
  });
};

export const useIssueCommentsQuery = (issueNumber: number) => {
  const { data } = useIssueByNumberQuery(issueNumber);

  return useQuery({
    queryKey: ['issue', issueNumber, 'comments'],
    queryFn: () => getIssueComments(data!.number),
    refetchOnWindowFocus: false,
    enabled: !!data,
  });
};
