import { PAGES } from "@/constants/pages";
import { auth, db } from "@/services/firebase";
import { useRouter } from "next/router";
import { useState, useEffect, JSX } from "react";
import PageLoader from "../general/PageLoader";
import { onAuthStateChanged } from "firebase/auth";
import { user_details } from "@/atoms/atoms";
import { useSetRecoilState } from "recoil";
import { doc, getDoc } from "firebase/firestore";

// Check if user is logged in
export const checkAuthentication = (ProtectedComponent: () => JSX.Element) => {
  return function CheckIfTheUserIsLoggedIn(props: object) {
    const [isLoading, setIsLoading] = useState(true);
    const setUser = useSetRecoilState(user_details);
    const router = useRouter();

    useEffect(() => {
      const unsub = onAuthStateChanged(auth, (user) => {
        setIsLoading(true);

        if (user === null) {
          router.push(PAGES.home);
          return;
        } else {
          getDoc(doc(db, "users", user.uid)).then((u) => {
            setUser({
              email: user.email!,
              name: user.displayName!,
              uid: user.uid,
              team_id: u.data()!.team_id,
            });

            setIsLoading(false);
          });
        }
      });

      return unsub;
    }, []);

    if (isLoading) {
      return <PageLoader type="full" />;
    }

    return <ProtectedComponent {...props} />;
  };
};

// Prevents already logged in user access to auth modals
export const alreadyLoggedIn = (ProtectedComponent: () => JSX.Element) => {
  return function StopLoggedInUsersAccessToAuthModals(props: object) {
    const [isLoading, setIsLoading] = useState(true);
    const setUser = useSetRecoilState(user_details);
    const router = useRouter();

    useEffect(() => {
      const unsub = onAuthStateChanged(auth, (user) => {
        setIsLoading(true);

        if (user) {
          getDoc(doc(db, "users", user.uid)).then((u) => {
            setUser({
              email: user.email!,
              name: user.displayName!,
              uid: user.uid,
              team_id: u.data()!.team_id,
            });

            router.push(PAGES.dashboard);
            return;
          });
        }

        setIsLoading(false);
      });

      return unsub;
    }, []);

    if (isLoading) {
      return <PageLoader type="full" />;
    }

    return <ProtectedComponent {...props} />;
  };
};
