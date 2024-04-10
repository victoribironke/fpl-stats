export const BASE_URL = "https://fpl-stats-api.vercel.app/api";

export const ENDPOINTS = {
  history: (team_id: string) =>
    BASE_URL + `/get-manager-history?team_id=${team_id}`,
};
