import { gameweeks, user_details } from "@/atoms/atoms";
import GWHistory from "@/components/dashboard/GWHistory";
import GWPicks from "@/components/dashboard/GWPicks";
import TopStats from "@/components/dashboard/TopStats";
import TransferSuggestions from "@/components/dashboard/TransferSuggestions";
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

      <div className="w-full flex justify-center items-start gap-4 flex-col lg:flex-row-reverse">
        <TopStats data={data as History} />
        <GWPicks />
      </div>

      <div className="w-full flex justify-center items-start gap-4 flex-col lg:flex-row-reverse">
        <div className="w-full lg:w-7/12">
          <p className="mt-4 text-lg font-medium">Transfer suggestions</p>
          <TransferSuggestions />
        </div>

        <div className="w-full lg:w-5/12">
          <p className="mt-4 text-lg font-medium">Gameweek history</p>
          <GWHistory data={data!} />
        </div>
      </div>
    </>
  );
};

export default checkAuthentication(Dashboard);
