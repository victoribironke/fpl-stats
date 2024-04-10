import TopStats from "@/components/dashboard/TopStats";
import HeadTemplate from "@/components/general/HeadTemplate";
import { checkAuthentication } from "@/components/hoc/ProtectedRoute";

const Dashboard = () => {
  return (
    <>
      <HeadTemplate title="Dashboard" />

      <TopStats />
    </>
  );
};

export default checkAuthentication(Dashboard);
