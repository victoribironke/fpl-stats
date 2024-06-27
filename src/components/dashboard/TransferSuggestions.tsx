import {
  gameweek,
  general_data,
  player_summary,
  user_details,
} from "@/atoms/atoms";
import { useGetFixtures, useGetGWPicks } from "@/hooks/dashboard";
import { EvaluatedPlayer, GeneralData, Positions } from "@/types/dashboard";
import { classNames, formatNumber, suggestTransfers } from "@/utils/helpers";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

const TransferSuggestions = () => {
  const gw = useRecoilValue(gameweek);
  const user = useRecoilValue(user_details);
  const { data, isLoading } = useGetGWPicks(user!.team_id, gw);
  const { data: fixtures, isLoading: fixturesLoading } = useGetFixtures();
  const setShowPlayerSummary = useSetRecoilState(player_summary);
  const generalData = useRecoilValue(general_data) as GeneralData;
  const positions = [
    { short: "GKP", full: "Goalkeepers" },
    { short: "DEF", full: "Defenders" },
    { short: "MID", full: "Midfielders" },
    { short: "FWD", full: "Forwards" },
  ];
  const [pos, setPos] = useState({ short: "GKP", full: "Goalkeepers" });
  const [transfers, setTransfers] = useState<EvaluatedPlayer[]>([]);

  const nextGWFixtures = fixtures
    ?.filter((f) => {
      if (gw === "38") return f.event === 38;

      return f.event === parseInt(gw) + 1;
    })
    .map((a) => {
      return {
        ...a,
        team_a: generalData.teams.find((t) => t.id === a.team_a)?.name,
        team_h: generalData.teams.find((t) => t.id === a.team_h)?.name,
      };
    });

  useEffect(() => {
    if (data) {
      const st = suggestTransfers(data, generalData.elements)
        .filter((t) => {
          const positions: Positions[] = ["GKP", "DEF", "MID", "FWD", "-"];
          const position = positions[t.element_type ? t.element_type - 1 : 4];

          if (position === pos.short) return t;
        })
        .slice(0, 15);

      setTransfers(st);
    }
  }, [data, pos]);

  if (fixturesLoading || isLoading) return <></>;

  return (
    <>
      <div className="w-full flex items-center justify-start gap-2 mt-2 flex-wrap">
        {positions.map((p, i) => (
          <button
            key={i}
            className={classNames(
              "px-3 py-1 rounded-md",
              pos.full === p.full
                ? "bg-blue text-white"
                : "bg-gray-200 hover:bg-blue hover:bg-opacity-10"
            )}
            onClick={() => setPos({ short: p.short, full: p.full })}
          >
            {p.full}
          </button>
        ))}
      </div>

      <div className="w-full mt-2 overflow-x-scroll rounded-lg border grid grid-cols-1">
        <table className="w-full text-left rtl:text-right">
          <thead className="border-b-2">
            <tr className="bg-white">
              <th
                scope="col"
                className="pl-4 pr-2 py-3 font-medium whitespace-nowrap"
              >
                Player
              </th>
              <th
                scope="col"
                className="px-2 py-3 font-medium whitespace-nowrap"
              >
                Team
              </th>
              <th
                scope="col"
                className="px-2 py-3 font-medium whitespace-nowrap"
              >
                Next opp.
              </th>
              <th
                scope="col"
                className="pl-2 pr-4 py-3 font-medium whitespace-nowrap"
              >
                Performance score
              </th>
            </tr>
          </thead>

          <tbody>
            {transfers.map((t, i) => {
              const positions: Positions[] = ["GKP", "DEF", "MID", "FWD", "-"];
              const position =
                positions[t.element_type ? t.element_type - 1 : 4];

              const team = generalData.teams.find((e) => e.id === t.team);
              const f = nextGWFixtures
                ?.filter(
                  (f) => f.team_a === team?.name || f.team_h === team?.name
                )
                .map((a) => {
                  const homeOrAway = a.team_a === team?.name ? "A" : "H";
                  const teamName = homeOrAway === "A" ? a.team_h : a.team_a;

                  return `${teamName} (${homeOrAway})`;
                });

              return (
                <tr className="bg-white border-b text-sm" key={i}>
                  <td
                    className="pl-4 text-blue font-medium pr-2 py-3 whitespace-nowrap hover:underline cursor-pointer"
                    onClick={() =>
                      setShowPlayerSummary(
                        `${t.first_name} ${t.second_name}|${t.id}|${position}|season` // Player's name, player's id from the API, player's position, GW or season stats
                      )
                    }
                  >
                    {t.first_name} {t.second_name}
                  </td>
                  <td className="px-2 py-3 whitespace-nowrap">{team?.name}</td>
                  <td className="px-2 py-3 whitespace-nowrap">
                    {f?.join(", ")}
                  </td>
                  <td className="pl-2 pr-4 py-3 whitespace-nowrap">
                    {formatNumber(parseFloat(t.performanceScore.toFixed(2)))}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TransferSuggestions;
