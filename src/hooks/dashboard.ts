// import { user_details } from "@/atoms/atoms";
import { History } from "@/types/dashboard";
import { useQuery } from "@tanstack/react-query";
// import { useRecoilValue } from "recoil";

export const useGetManagerHistory = () => {
  // const user = useRecoilValue(user_details);
  const url = `https://fpl-stats-api.vercel.app/api/get-manager-history?team_id=10416894`;

  const { error, data, isLoading } = useQuery({
    queryKey: ["getManagerHistory"],
    queryFn: async () => {
      const data: History = await (
        await fetch(url, { mode: "no-cors" })
      ).json();

      return data;
    },
  });

  return { error, data, isLoading };
};
