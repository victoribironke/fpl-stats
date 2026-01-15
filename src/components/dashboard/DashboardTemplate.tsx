import { DashboardTemplateProps } from "@/types/dashboard";
import {
  gameweek,
  general_data,
  player_select,
  player_summary,
} from "@/atoms/atoms";
import { useRecoilState, useSetRecoilState } from "recoil";
import { TbLogout2 } from "react-icons/tb";
import { useEffect } from "react";
import { useGetGeneralData } from "@/hooks/dashboard";
import PageLoader from "../general/PageLoader";
import Modal from "../general/Modal";
import WideModal from "../general/WideModal";
import PlayerSummaryComp from "./PlayerSummaryComp";
import PlayerSelect from "./PlayerSelect";
import { PAGES } from "@/constants/pages";
import Link from "next/link";
import { useRouter } from "next/router";

const DashboardTemplate = ({ children }: DashboardTemplateProps) => {
  const { data, isLoading } = useGetGeneralData();
  const [gw, setGameweek] = useRecoilState(gameweek);
  const [showPlayerSelect, setShowPlayerSelect] = useRecoilState(player_select);
  const [showPlayerSummary, setShowPlayerSummary] =
    useRecoilState(player_summary);
  const setGeneralData = useSetRecoilState(general_data);
  const { push } = useRouter();

  const p = showPlayerSummary?.split("|") ?? [];

  const signOutUser = () => {
    localStorage.removeItem("fpl-stats-user-info");

    push(PAGES.home);
  };

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
          <div className="w-full max-w-[1280px] flex gap-4 items-center justify-center">
            <div className="bg-green bg-opacity-10 text-green py-1 px-3 rounded-md">
              <Link href={PAGES.dashboard} className="hover:underline">
                GW {gw}
              </Link>
            </div>

            <Link href={PAGES.analysis} className="text-blue hover:underline">
              Analysis
            </Link>

            <button
              className="py-1.5 px-1.5 sm:px-3 rounded-md ml-auto bg-red text-white"
              onClick={signOutUser}
            >
              <TbLogout2 className="sm:hidden text-lg" />
              <p className="hidden sm:block text-sm">Switch team</p>
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

      {showPlayerSelect && (
        <WideModal
          header="Player analysis"
          dismiss={() => setShowPlayerSelect(false)}
        >
          <PlayerSelect />
        </WideModal>
      )}
    </>
  );
};

export default DashboardTemplate;
