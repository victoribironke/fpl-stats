import { gameweek, user_details } from "@/atoms/atoms";
import { ENDPOINTS } from "@/constants/endpoints";
import {
  GWPicks,
  GeneralData,
  History,
  PlayerSummary,
} from "@/types/dashboard";
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

export const useGetGWPicks = () => {
  const user = useRecoilValue(user_details);
  const gw = useRecoilValue(gameweek);
  const url = ENDPOINTS.gw_picks(user!.team_id, gw);

  const { error, data, isLoading } = useQuery({
    queryKey: ["getGWPicks"],
    queryFn: async () => {
      const data: GWPicks = await (await fetch(url)).json();

      return data;
    },
  });

  return { error, data, isLoading };
};

export const useGetGeneralData = () => {
  const url = ENDPOINTS.general_data;

  const { error, data, isLoading } = useQuery({
    queryKey: ["getGeneralData"],
    queryFn: async () => {
      const data: GeneralData = await (await fetch(url)).json();

      return data;
    },
  });

  return { error, data, isLoading };
};

export const useGetPlayerSummary = (id: string) => {
  const url = ENDPOINTS.player_summary(id);

  const { error, data, isLoading } = useQuery({
    queryKey: ["getPlayerSummary"],
    queryFn: async () => {
      const data: PlayerSummary = await (await fetch(url)).json();

      return data;
    },
  });

  return { error, data, isLoading };
};
