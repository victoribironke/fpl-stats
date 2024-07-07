import { general_data, player_select, selected_players } from "@/atoms/atoms";
import HeadTemplate from "@/components/general/HeadTemplate";
import { checkAuthentication } from "@/components/hoc/ProtectedRoute";
import { GeneralData } from "@/types/dashboard";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

const Analysis = () => {
  const [selectedPlayers, setSelectedPlayers] =
    useRecoilState(selected_players);
  const [showPlayerSelect, setShowPlayerSelect] = useRecoilState(player_select);

  useEffect(() => setShowPlayerSelect(true), []);

  return (
    <>
      <HeadTemplate title="Player analysis" />
    </>
  );
};

export default checkAuthentication(Analysis);
