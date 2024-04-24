export const BASE_URL = "https://fantasy.premierleague.com/api";

export const ENDPOINTS = {
  history: (team_id: string) => BASE_URL + `/entry/${team_id}/history/`,
  gw_picks: (team_id: string, gw: string) =>
    BASE_URL + `/entry/${team_id}/event/${gw}/picks/`,
  player_summary: (id: string) => BASE_URL + `/element-summary/${id}/`,
  general_data: BASE_URL + "/bootstrap-static/",
};
