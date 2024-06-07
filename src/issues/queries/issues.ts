import { useQuery } from "@tanstack/react-query";
import { getIssueByNumber, getIssueComments, getIssues } from "../services";

export const getIssuesQuery = () => {
  return useQuery({
    queryKey: ['issues'],
    queryFn: getIssues,
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchOnWindowFocus: false
  });
};

export const getIssueByNumberQuery = (issueNumber: number) => {
  return useQuery({
    queryKey: ['issue', issueNumber],
    queryFn: () => getIssueByNumber(issueNumber),
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchOnWindowFocus: false
  });
};

export const getIssueCommentsQuery = (issueNumber: number) => {
  const { data } = getIssueByNumberQuery(issueNumber);

  return useQuery({
    queryKey: ['issue', issueNumber, 'comments'],
    queryFn: () => getIssueComments(data!.number),
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchOnWindowFocus: false,
    enabled: !!data
  });
};
