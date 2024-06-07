import { ENDPOINTS } from "@/constants/endpoints";
import {
  GWPicks,
  GeneralData,
  History,
  PlayerSummary,
} from "@/types/dashboard";
import { useQuery } from "@tanstack/react-query";

const isDev = process.env.NODE_ENV === "development";

export const useGetManagerHistory = (team_id: string) => {
  const url = ENDPOINTS.history(team_id);

  const { error, data, isLoading } = useQuery({
    queryKey: ["getManagerHistory"],
    queryFn: async () => {
      const data: History = await (
        await fetch(isDev ? url : "/api/main", { headers: { url } })
      ).json();

      return data;
    },
  });

  return { error, data, isLoading };
};

export const useGetGWPicks = (team_id: string, gw: string) => {
  const url = ENDPOINTS.gw_picks(team_id, gw);

  const { error, data, isLoading, isFetching } = useQuery({
    queryKey: ["getGWPicks"],
    queryFn: async () => {
      const data: GWPicks = await (
        await fetch(isDev ? url : "/api/main", { headers: { url } })
      ).json();

      return data;
    },
  });

  return { error, data, isLoading, isFetching };
};

export const useGetGeneralData = () => {
  const url = ENDPOINTS.general_data;

  const { error, data, isLoading } = useQuery({
    queryKey: ["getGeneralData"],
    queryFn: async () => {
      const data: GeneralData = await (
        await fetch(isDev ? url : "/api/main", { headers: { url } })
      ).json();

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
      const data: PlayerSummary = await (
        await fetch(isDev ? url : "/api/main", { headers: { url } })
      ).json();

      return data;
    },
  });

  return { error, data, isLoading };
};

// export const useGetManagerHistory = (team_id: string) => {
//   const url = ENDPOINTS.history(team_id);

//   const { error, data, isLoading } = useQuery({
//     queryKey: ["getManagerHistory"],
//     queryFn: async () => {
//       const data: History = await (
//         await fetch(MAIN_URL, { headers: { url }, mode: "no-cors" })
//       ).json();

//       return data;
//     },
//   });

//   return { error, data, isLoading };
// };

// export const useGetGWPicks = (team_id: string, gw: string) => {
//   const url = ENDPOINTS.gw_picks(team_id, gw);

//   const { error, data, isLoading, isFetching } = useQuery({
//     queryKey: ["getGWPicks"],
//     queryFn: async () => {
//       const data: GWPicks = await (
//         await fetch(MAIN_URL, { headers: { url }, mode: "no-cors" })
//       ).json();

//       return data;
//     },
//   });

//   return { error, data, isLoading, isFetching };
// };

// export const useGetGeneralData = () => {
//   const url = ENDPOINTS.general_data;

//   const { error, data, isLoading } = useQuery({
//     queryKey: ["getGeneralData"],
//     queryFn: async () => {
//       const data: GeneralData = await (
//         await fetch(MAIN_URL, { headers: { url }, mode: "no-cors" })
//       ).json();

//       return data;
//     },
//   });

//   return { error, data, isLoading };
// };

// export const useGetPlayerSummary = (id: string) => {
//   const url = ENDPOINTS.player_summary(id);

//   const { error, data, isLoading } = useQuery({
//     queryKey: ["getPlayerSummary"],
//     queryFn: async () => {
//       const data: PlayerSummary = await (
//         await fetch(MAIN_URL, { headers: { url }, mode: "no-cors" })
//       ).json();

//       return data;
//     },
//   });

//   return { error, data, isLoading };
// };
