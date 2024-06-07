import { useQuery } from "@tanstack/react-query"; 
import { getLabels } from "../services";

export const getLabelsQuery = () => {
  return useQuery({
    queryKey: ['labels'],
    queryFn: getLabels,
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchOnWindowFocus: false
  });
};
