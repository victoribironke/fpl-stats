import { useGetPlayerSummary } from "@/hooks/dashboard";
import PageLoader from "../general/PageLoader";
import { gameweek } from "@/atoms/atoms";
import { useRecoilValue } from "recoil";
import { PlayerSummary } from "@/types/dashboard";
import { calculateFPLPoints } from "@/utils/helpers";

const PlayerSummaryComp = ({ id }: { id: string }) => {
  const { data, isFetching } = useGetPlayerSummary(id.split("|")[1]);
  const gw = useRecoilValue(gameweek);

  const positions = {
    GKP: "Goalkeeper",
    DEF: "Defender",
    MID: "Midfielder",
    FWD: "Forward",
  };
  const position = positions[id.split("|")[2] as keyof typeof positions];

  if (isFetching) return <PageLoader type="small" />;

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
          {calculateFPLPoints(
            data as PlayerSummary,
            parseInt(gw),
            position
          ).map((s, i) => (
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
