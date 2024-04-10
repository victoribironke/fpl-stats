import { user_details } from "@/atoms/atoms";
import { ENDPOINTS } from "@/constants/endpoints";
import { History } from "@/types/dashboard";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";

export const useGetManagerHistory = () => {
  const user = useRecoilValue(user_details);
  const url = ENDPOINTS.history(user!.team_id);

  const { error, data, isLoading } = useQuery({
    queryKey: ["getManagerHistory"],
    queryFn: async () => {
      const data: History = await (await fetch(url)).json();

      return data;
    },
  });

  return { error, data, isLoading };
};
