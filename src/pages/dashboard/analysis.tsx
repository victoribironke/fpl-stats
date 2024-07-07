import { player_select } from "@/atoms/atoms";
import HeadTemplate from "@/components/general/HeadTemplate";
import { checkAuthentication } from "@/components/hoc/ProtectedRoute";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

const Analysis = () => {
  // const [selectedPlayers, setSelectedPlayers] =
  //   useRecoilState(selected_players);
  const [_showPlayerSelect, setShowPlayerSelect] =
    useRecoilState(player_select);

  useEffect(() => setShowPlayerSelect(true), []);

  return (
    <>
      <HeadTemplate title="Player analysis" />
    </>
  );
};

export default checkAuthentication(Analysis);
