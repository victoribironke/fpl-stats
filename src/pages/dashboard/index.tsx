import HeadTemplate from "@/components/general/HeadTemplate";
import { checkAuthentication } from "@/components/hoc/ProtectedRoute";
import { signOutUser } from "@/utils/firebase";

const Dashboard = () => {
  return (
    <>
      <HeadTemplate title="Dashboard" />

      <div>Dashboard</div>
      <button onClick={signOutUser}>Sign out</button>
    </>
  );
};

export default checkAuthentication(Dashboard);
