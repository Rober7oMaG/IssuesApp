import { githubApi } from "../../api";
import { delay } from "../../helpers";
import { Issue } from "../interfaces";

export const getIssues = async () => {
  const { data } = await githubApi.get<Issue[]>('/issues');
  return data;
};

export const getIssueByNumber = async (issueNumber: number) => {
  delay(2);

  const { data } = await githubApi.get<Issue>(`/issues/${issueNumber}`);
  return data;
}

export const getIssueComments = async (issueNumber: number) => {
  delay(2);

  const { data } = await githubApi.get<Issue[]>(`/issues/${issueNumber}/comments`);
  return data;
}