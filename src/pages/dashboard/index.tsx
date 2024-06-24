import { gameweeks, user_details } from "@/atoms/atoms";
import GWPicks from "@/components/dashboard/GWPicks";
import GWPicksTable from "@/components/dashboard/GWPicksTable";
import TopStats from "@/components/dashboard/TopStats";
import HeadTemplate from "@/components/general/HeadTemplate";
import PageLoader from "@/components/general/PageLoader";
import { checkAuthentication } from "@/components/hoc/ProtectedRoute";
import { useGetManagerHistory } from "@/hooks/dashboard";
import { History } from "@/types/dashboard";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

const Dashboard = () => {
  const user = useRecoilValue(user_details);
  const { data, isLoading } = useGetManagerHistory(user!.team_id);
  const setGameweeks = useSetRecoilState(gameweeks);

  useEffect(() => {
    if (data) {
      setGameweeks(
        data.current
          .sort((a, b) => (a.event < b.event ? 1 : -1))
          .map((g) => `GW ${g.event.toString()}`)
      );
    }
  }, [data]);

  if (isLoading) return <PageLoader type="small" />;

  return (
    <>
      <HeadTemplate title="Dashboard" />

      <TopStats data={data as History} />

      <div className="mt-4 w-full flex justify-center items-start gap-4 flex-col lg:flex-row">
        <GWPicks />
        <GWPicksTable />
        {/* <div className="w-full lg:w-1/3 overflow-x-scroll rounded-lg border grid grid-cols-1"></div> */}
        {/* <GWHistory data={data as History} /> */}
      </div>
    </>
  );
};

export default checkAuthentication(Dashboard);
