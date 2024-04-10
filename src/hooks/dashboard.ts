import { user_details } from "@/atoms/atoms";
import { History, User } from "@/types/dashboard";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";

export const useGetManagerHistory = () => {
  const { team_id } = useRecoilValue(user_details) as User;

  const { error, data, isLoading } = useQuery({
    queryKey: ["getManagerHistory"],
    queryFn: () =>
      fetch(`https://fantasy.premierleague.com/api/entry/${team_id}/history/`, {
        mode: "no-cors",
      })
        .then((res) => res.json())
        .then((data) => data as History),
  });

  return { error, data, isLoading };
};
