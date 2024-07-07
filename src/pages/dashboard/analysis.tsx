import { general_data, player_select, selected_players } from "@/atoms/atoms";
import HeadTemplate from "@/components/general/HeadTemplate";
import { checkAuthentication } from "@/components/hoc/ProtectedRoute";
import { GeneralData } from "@/types/dashboard";
import {
  analysisStatistics,
  classNames,
  evaluatePlayer,
  formatNumber,
  getPlayerImageUrl,
} from "@/utils/helpers";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

const Analysis = () => {
  const selectedPlayers = useRecoilValue(selected_players);
  const setShowPlayerSelect = useSetRecoilState(player_select);
  const generalData = useRecoilValue(general_data) as GeneralData;

  useEffect(() => setShowPlayerSelect(true), []);

  return (
    <>
      <HeadTemplate title="Player analysis" />

      <button
        className="text-yellow hover:underline mb-4 text-lg"
        onClick={() => setShowPlayerSelect(true)}
      >
        Edit
      </button>

      <div className="w-full overflow-x-scroll rounded-lg border grid grid-cols-1">
        <table className="w-full text-left rtl:text-right">
          <thead className="border-b-2">
            <tr className="bg-white">
              <th
                scope="col"
                className="pl-4 pr-2 py-3 font-medium whitespace-nowrap"
              ></th>

              {selectedPlayers.map((s, i) => (
                <th
                  scope="col"
                  className={classNames(
                    "font-medium whitespace-nowrap",
                    i === selectedPlayers.length - 1
                      ? "pl-2 pr-4 py-3"
                      : "px-2 py-3"
                  )}
                  key={i}
                >
                  <img
                    src={getPlayerImageUrl(
                      generalData.elements.find((e) => e.id === s)
                    )}
                    alt="player image"
                    className="w-20 md:w-24 h-auto"
                  />
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {analysisStatistics.map((s, i) => (
              <tr
                className={classNames(
                  "border-b text-sm",
                  i % 2 != 0 ? "bg-white" : ""
                )}
                key={i}
              >
                <td className="pl-4 font-medium text-blue pr-2 py-3 whitespace-nowrap">
                  {s.title}
                </td>

                {selectedPlayers.map((p, j) => {
                  const player = evaluatePlayer(
                    generalData.elements.find((e) => e.id === p)!
                  );
                  const team = generalData.teams.find(
                    (e) => e.id === player.team
                  );

                  const d = player[s.selector as keyof typeof player] as number;
                  const val =
                    s.selector === "name"
                      ? `${player.first_name} ${player.second_name}`
                      : s.selector === "team"
                      ? `${team?.name}`
                      : s.format
                      ? formatNumber(d)
                      : d;

                  return (
                    <td
                      scope="col"
                      className={classNames(
                        "whitespace-nowrap",
                        i === selectedPlayers.length - 1
                          ? "pl-2 pr-4 py-3"
                          : "px-2 py-3"
                      )}
                      key={j}
                    >
                      {val}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default checkAuthentication(Analysis);
