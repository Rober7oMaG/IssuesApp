import { useQuery } from "@tanstack/react-query";
import { githubApi } from "../../api";
import { Issue } from "../interfaces";

const getIssues = async () => {
  const { data } = await githubApi.get<Issue[]>('/issues', {
    headers: {
      Authorization: null
    },
  });

  return data;
};

export const getIssuesQuery = () => {
  return useQuery({
    queryKey: ['issues'],
    queryFn: getIssues,
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchOnWindowFocus: false
  });
};