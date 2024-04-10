import { auth, db } from "@/services/firebase";
import {
  GoogleAuthProvider,
  browserLocalPersistence,
  setPersistence,
  signInWithPopup,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const signOutUser = () => auth.signOut();

export const getCurrentUser = () => auth.currentUser;

export const loginUser = async () => {
  const provider = new GoogleAuthProvider();

  try {
    const user = await setPersistence(auth, browserLocalPersistence).then(() =>
      signInWithPopup(auth, provider)
    );

    const u = await getDoc(doc(db, "users", user.user.uid));

    const user_details = {
      email: user.user.email,
      name: user.user.displayName,
      uid: user.user.uid,
      team_id: "",
    };

    if (!u.exists()) {
      await setDoc(doc(db, "users", user.user.uid), user_details);
    } else user_details.team_id = u.data().team_id;

    return { data: user_details, error: null };
  } catch (e: any) {
    return { data: null, error: e };
  }
};
