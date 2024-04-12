export const BASE_URL = "https://fpl-stats-api.vercel.app/api";
// export const BASE_URL = "https://fantasy.premierleague.com/api";

export const ENDPOINTS = {
  history: (team_id: string) =>
    BASE_URL + `/get-manager-history?team_id=${team_id}`,
  gw_picks: (team_id: string, gw: string) =>
    BASE_URL + `/get-gw-picks?team_id=${team_id}&gw=${gw}`,
  general_data: BASE_URL + "/get-general-data",
  player_summary: (id: string) => BASE_URL + `/get-player-summary?id=${id}`,
};
