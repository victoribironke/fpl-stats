import { user_details } from "@/atoms/atoms";
import HeadTemplate from "@/components/general/HeadTemplate";
import { alreadyLoggedIn } from "@/components/hoc/ProtectedRoute";
import { User } from "@/types/dashboard";
import { loginUser } from "@/utils/firebase";
import toast from "react-hot-toast";
import { useSetRecoilState } from "recoil";

// edit head template and set security
const Home = () => {
  const setUser = useSetRecoilState(user_details);

  const loginAndSaveUser = async () => {
    const { data, error } = await loginUser();

    if (error) {
      toast.error("An error occured.");
      return;
    }

    setUser(data as User);
  };

  return (
    <>
      <HeadTemplate title="Home" />

      <p>Home</p>
      <button onClick={loginAndSaveUser}>Login</button>
    </>
  );
};

export default alreadyLoggedIn(Home);
