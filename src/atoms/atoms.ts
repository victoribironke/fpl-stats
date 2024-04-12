import { GeneralData, User } from "@/types/dashboard";
import { atom } from "recoil";

export const user_details = atom<User | null>({
  key: "user details",
  default: null,
});

export const gameweek = atom({
  key: "gameweek",
  default: "1",
});

export const gameweeks = atom<string[]>({
  key: "gameweeks",
  default: [],
});

export const general_data = atom<GeneralData | null>({
  key: "general data",
  default: null,
});

export const player_summary = atom<string | null>({
  key: "player summary",
  default: null,
});
