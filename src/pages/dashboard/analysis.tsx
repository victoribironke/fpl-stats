import { general_data, player_select, selected_players } from "@/atoms/atoms";
import HeadTemplate from "@/components/general/HeadTemplate";
import { checkAuthentication } from "@/components/hoc/ProtectedRoute";
import { useGetMultiplePlayerSummaries } from "@/hooks/dashboard";
import { GeneralData, PlayerSummary } from "@/types/dashboard";
import {
  analysisStatistics,
  classNames,
  evaluatePlayer,
  formatNumber,
  formatProbability,
  getPlayerImageUrl,
  getStatIncreaseProbability,
} from "@/utils/helpers";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

const gameOptions = [5, 10, 15] as const;
type GameOption = (typeof gameOptions)[number];

const Analysis = () => {
  const selectedPlayers = useRecoilValue(selected_players);
  const setShowPlayerSelect = useSetRecoilState(player_select);
  const generalData = useRecoilValue(general_data) as GeneralData;
  const [lastNGames, setLastNGames] = useState<GameOption>(5);

  const { data: playerSummaries, isLoading: summariesLoading } =
    useGetMultiplePlayerSummaries(selectedPlayers);

  useEffect(() => setShowPlayerSelect(true), []);

  const getProbabilityForStat = (
    playerId: number,
    stat: string
  ): string | null => {
    if (!playerSummaries || !playerSummaries[playerId]) return null;

    const history = playerSummaries[playerId].history;
    if (!history || history.length === 0) return null;

    const probability = getStatIncreaseProbability(
      history,
      stat as keyof PlayerSummary["history"][0],
      lastNGames
    );

    return formatProbability(probability);
  };

  return (
    <>
      <HeadTemplate title="Player analysis" />

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
        <button
          className="text-yellow hover:underline text-lg"
          onClick={() => setShowPlayerSelect(true)}
        >
          Edit
        </button>

        <div className="flex items-center gap-3">
          <label className="text-sm text-gray-600">Form based on last:</label>
          <div className="flex rounded-lg overflow-hidden border border-gray-300">
            {gameOptions.map((option) => (
              <button
                key={option}
                onClick={() => setLastNGames(option)}
                className={classNames(
                  "px-3 py-1.5 text-sm font-medium transition-colors",
                  lastNGames === option
                    ? "bg-blue text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                )}
              >
                {option} games
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-4 p-3 bg-blue/5 border border-blue/20 rounded-lg">
        <p className="text-sm text-gray-600">
          <span className="font-medium text-blue">Probability %</span> shows the
          chance of the player increasing that statistic in the next match,
          calculated using the Poisson distribution based on their recent form.
        </p>
      </div>

      {summariesLoading && selectedPlayers.length > 0 && (
        <div className="mb-4 text-sm text-gray-500">
          Loading player statistics...
        </div>
      )}

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
                  {s.poissonEligible && (
                    <span className="text-xs text-gray-400 ml-1">(%)</span>
                  )}
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

                  const probability = s.poissonEligible
                    ? getProbabilityForStat(p, s.selector)
                    : null;

                  return (
                    <td
                      scope="col"
                      className={classNames(
                        "whitespace-nowrap",
                        j === selectedPlayers.length - 1
                          ? "pl-2 pr-4 py-3"
                          : "px-2 py-3"
                      )}
                      key={j}
                    >
                      <span>{val}</span>
                      {probability && (
                        <span className="ml-2 text-xs font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                          {probability}
                        </span>
                      )}
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
