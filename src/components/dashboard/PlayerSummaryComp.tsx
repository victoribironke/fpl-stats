import { useGetPlayerSummary } from "@/hooks/dashboard";
import PageLoader from "../general/PageLoader";
import { gameweek, general_data } from "@/atoms/atoms";
import { useRecoilValue } from "recoil";
import { EvaluatedPlayer, GeneralData, PlayerSummary } from "@/types/dashboard";
import {
  calculateFPLPoints,
  classNames,
  evaluatePlayer,
  formatNumber,
  getPlayerImageUrl,
} from "@/utils/helpers";

const positions = {
  GKP: "Goalkeeper",
  DEF: "Defender",
  MID: "Midfielder",
  FWD: "Forward",
};

const PlayerSummaryComp = ({ id }: { id: string }) => {
  const p = id.split("|");
  const { data, isFetching } = useGetPlayerSummary(p[1]);
  const generalData = useRecoilValue(general_data) as GeneralData;
  const gw = useRecoilValue(gameweek);

  const evaluatedPlayer = evaluatePlayer(
    generalData.elements.find((e) => e.id === parseInt(p[1]))!
  );

  const position = positions[p[2] as keyof typeof positions];

  if (isFetching) return <PageLoader type="small" />;

  return (
    <>
      <div className="mb-4 flex gap-6">
        <img
          src={getPlayerImageUrl(evaluatedPlayer)}
          alt="player image"
          className="w-16 md:w-20 h-auto"
        />
        <div>
          <p className="font-medium text-lg">
            {evaluatedPlayer.first_name} {evaluatedPlayer.second_name}
          </p>
          <p>{positions[evaluatedPlayer.position as keyof typeof positions]}</p>
          <p>
            {generalData.teams.find((t) => t.id === evaluatedPlayer.team)?.name}
          </p>
        </div>
      </div>

      {p[3] === "gw" ? (
        <GWStatsTable
          data={data as PlayerSummary}
          position={position}
          gw={gw}
        />
      ) : (
        <SeasonStatsTable data={evaluatedPlayer} />
      )}
    </>
  );
};

const SeasonStatsTable = ({ data }: { data: EvaluatedPlayer }) => {
  const criteriaWithValues = [
    { criterion: "Form", value: data.form },
    { criterion: "Points per game", value: data.points_per_game },
    { criterion: "Total points", value: data.total_points },
    {
      criterion: "Creativity",
      value: data.creativity,
    },
    { criterion: "Minutes", value: data.minutes },
    {
      criterion: "Goals scored",
      value: data.goals_scored,
    },
    {
      criterion: "Goals conceded",
      value: data.goals_conceded,
    },
    {
      criterion: "Assists",
      value: data.assists,
    },
    {
      criterion: "Clean sheets",
      value: data.clean_sheets,
    },
    { criterion: "Selected by percent", value: data.selected_by_percent },
    {
      criterion: "Expected goal involvements",
      value: data.expected_goal_involvements,
    },
    { criterion: "Influence", value: data.influence },
    { criterion: "Expected assists", value: data.expected_assists },
    { criterion: "Bonus", value: data.bonus },
    { criterion: "Performance score", value: data.performanceScore },
  ];

  return (
    <div className="w-full overflow-x-scroll rounded-lg border grid grid-cols-1">
      <table className="w-full text-left rtl:text-right">
        <thead className="border-b-2">
          <tr className="bg-white">
            <th
              scope="col"
              className="pl-4 pr-2 py-3 font-medium whitespace-nowrap"
            >
              Statistic
            </th>
            <th scope="col" className="pl-2 pr-4 py-3 font-medium">
              Value
            </th>
          </tr>
        </thead>

        <tbody>
          {criteriaWithValues.map((c, i) => (
            <tr className="bg-white border-b text-sm" key={i}>
              <td
                className={classNames(
                  "pl-4 pr-2 py-3 whitespace-nowrap",
                  c.criterion === "Performance score"
                    ? "font-semibold"
                    : "font-normal"
                )}
              >
                {c.criterion}
              </td>
              <td
                className={classNames(
                  "pl-2 pr-4 py-3 whitespace-nowrap",
                  c.criterion === "Performance score"
                    ? "font-semibold"
                    : "font-normal"
                )}
              >
                {formatNumber(
                  typeof c.value === "string" ? parseInt(c.value) : c.value
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const GWStatsTable = ({
  data,
  gw,
  position,
}: {
  data: PlayerSummary;
  gw: string;
  position: string;
}) => {
  return (
    <div className="w-full overflow-x-scroll rounded-lg border grid grid-cols-1">
      <table className="w-full text-left rtl:text-right">
        <thead className="border-b-2">
          <tr className="bg-white">
            <th
              scope="col"
              className="pl-4 pr-2 py-3 font-medium whitespace-nowrap"
            >
              Statistic
            </th>
            <th scope="col" className="px-2 py-3 font-medium whitespace-nowrap">
              Value
            </th>
            <th scope="col" className="pl-2 pr-4 py-3 font-medium">
              Points
            </th>
          </tr>
        </thead>

        <tbody>
          {calculateFPLPoints(data, parseInt(gw), position).map((s, i) => (
            <tr className="bg-white border-b text-sm" key={i}>
              <td className="pl-4 pr-2 py-3 whitespace-nowrap">
                {s.statistic}
              </td>
              <td className="px-2 py-3 whitespace-nowrap">{s.value}</td>
              <td className="pl-2 pr-4 py-3 whitespace-nowrap">{s.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerSummaryComp;
