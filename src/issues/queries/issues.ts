import { useQuery } from '@tanstack/react-query';

import {
  getIssueByNumber,
  getIssueComments,
  getIssues,
} from '@issues/services';

export const useIssuesQuery = () => {
  return useQuery({
    queryKey: ['issues'],
    queryFn: getIssues,
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchOnWindowFocus: false,
  });
};

export const useIssueByNumberQuery = (issueNumber: number) => {
  return useQuery({
    queryKey: ['issue', issueNumber],
    queryFn: () => getIssueByNumber(issueNumber),
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchOnWindowFocus: false,
  });
};

export const useIssueCommentsQuery = (issueNumber: number) => {
  const { data } = useIssueByNumberQuery(issueNumber);

  return useQuery({
    queryKey: ['issue', issueNumber, 'comments'],
    queryFn: () => getIssueComments(data!.number),
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchOnWindowFocus: false,
    enabled: !!data,
  });
};
