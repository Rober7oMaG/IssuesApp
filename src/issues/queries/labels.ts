import { useQuery } from "@tanstack/react-query"; 
import { githubApi } from "../../api";
import { Label } from "../interfaces";

const getLabels = async () => {
  const { data } = await githubApi.get<Label[]>('/labels');
  return data;
};

export const getLabelsQuery = () => {
  return useQuery({
    queryKey: ['labels'],
    queryFn: getLabels,
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchOnWindowFocus: false
  });
};
