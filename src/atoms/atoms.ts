import { User } from "@/types/dashboard";
import { atom } from "recoil";

export const user_details = atom<User | null>({
  key: "user details",
  default: null,
});
