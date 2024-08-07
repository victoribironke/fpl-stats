import { PAGES } from "@/constants/pages";
import { useRouter } from "next/router";
import { useState, useEffect, JSX } from "react";
import PageLoader from "../general/PageLoader";
import { user_details } from "@/atoms/atoms";
import { useSetRecoilState } from "recoil";

export const checkAuthentication = (ProtectedComponent: () => JSX.Element) => {
  return function CheckIfTheUserIsLoggedIn(props: object) {
    const [isLoading, setIsLoading] = useState(true);
    const setUser = useSetRecoilState(user_details);
    const { push, pathname } = useRouter();

    useEffect(() => {
      const user_info = JSON.parse(
        localStorage.getItem("fpl-stats-user-info")!
      );

      setIsLoading(true);

      if (!user_info) {
        push(PAGES.home);
        return;
      } else {
        setUser({
          team_id: user_info.team_id,
        });

        push(pathname);
      }

      setIsLoading(false);
    }, []);

    if (isLoading) {
      return <PageLoader type="full" />;
    }

    return <ProtectedComponent {...props} />;
  };
};

export const alreadyLoggedIn = (ProtectedComponent: () => JSX.Element) => {
  return function StopLoggedInUsersAccessToAuthModals(props: object) {
    const [isLoading, setIsLoading] = useState(true);
    const setUser = useSetRecoilState(user_details);
    const router = useRouter();

    useEffect(() => {
      const user_info = JSON.parse(
        localStorage.getItem("fpl-stats-user-info")!
      );

      setIsLoading(true);

      if (user_info) {
        setUser({
          team_id: user_info.team_id,
        });

        router.push(PAGES.dashboard);
        return;
      }

      setIsLoading(false);
    }, []);

    if (isLoading) {
      return <PageLoader type="full" />;
    }

    return <ProtectedComponent {...props} />;
  };
};
