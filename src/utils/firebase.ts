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

    const userExists = (await getDoc(doc(db, "users", user.user.uid))).exists();

    const user_details = {
      email: user.user.email,
      name: user.user.displayName,
      uid: user.user.uid,
    };

    if (!userExists) {
      await setDoc(doc(db, "users", user.user.uid), user_details);
    }

    return { data: user_details, error: null };
  } catch (e: any) {
    return { data: null, error: e };
  }
};
