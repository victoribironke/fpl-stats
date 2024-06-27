import { DashboardTemplateProps } from "@/types/dashboard";
import {
  gameweek,
  general_data,
  player_summary,
  user_details,
} from "@/atoms/atoms";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { signOutUser } from "@/utils/firebase";
import { TbLogout2 } from "react-icons/tb";
import { useEffect } from "react";
import { useGetGeneralData } from "@/hooks/dashboard";
import PageLoader from "../general/PageLoader";
import Modal from "../general/Modal";
import PlayerSummaryComp from "./PlayerSummaryComp";

const DashboardTemplate = ({ children }: DashboardTemplateProps) => {
  const user = useRecoilValue(user_details);
  const { data, isLoading } = useGetGeneralData();
  const [gw, setGameweek] = useRecoilState(gameweek);
  const [showPlayerSummary, setShowPlayerSummary] =
    useRecoilState(player_summary);
  const setGeneralData = useSetRecoilState(general_data);

  const p = showPlayerSummary?.split("|") ?? [];

  useEffect(() => {
    if (data) {
      setGeneralData(data);
      // setGameweek("35");
      setGameweek(data.events.find((e) => e.is_current)?.id.toString() ?? "1");
    }
  }, [data]);

  if (isLoading) return <PageLoader type="full" />;

  return (
    <>
      <section className="w-full min-h-screen flex items-center flex-col">
        <div className="w-full bg-white border-b p-4 flex items-center justify-center">
          <div className="w-full max-w-[1280px] flex gap-4">
            <button className="bg-gray-100 py-1.5 px-3 rounded-md">
              {user?.name}
            </button>

            <div className="bg-blue text-white py-1.5 px-3 rounded-md">
              GW {gw}
            </div>

            <button
              className="py-1.5 px-1.5 sm:px-3 rounded-md ml-auto bg-red text-white"
              onClick={signOutUser}
            >
              <TbLogout2 className="sm:hidden text-lg" />
              <p className="hidden sm:block">Log out</p>
            </button>
          </div>
        </div>

        <div className="w-full bg-gray-100 min-h-[calc(100vh-4rem)] p-4 overflow-scroll flex items-center flex-col">
          <div className="w-full max-w-[1280px] min-h-full">{children}</div>
        </div>
      </section>

      {showPlayerSummary && (
        <Modal
          header={`${p[0]} ${p[3] === "gw" ? `(GW ${gw})` : "(Season)"}`}
          dismiss={() => setShowPlayerSummary(null)}
        >
          <PlayerSummaryComp id={showPlayerSummary} />
        </Modal>
      )}
    </>
  );
};

export default DashboardTemplate;
