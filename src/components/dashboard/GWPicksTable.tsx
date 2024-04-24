import {
  gameweek,
  general_data,
  player_summary,
  user_details,
} from "@/atoms/atoms";
import { useGetGWPicks } from "@/hooks/dashboard";
import { GeneralData } from "@/types/dashboard";
import { classNames, getElementDetails } from "@/utils/helpers";
import { IoIosArrowUp } from "react-icons/io";
import { useRecoilValue, useSetRecoilState } from "recoil";
import PageLoader from "../general/PageLoader";

const GWPicksTable = () => {
  const gw = useRecoilValue(gameweek);
  const user = useRecoilValue(user_details);
  const { data, isLoading } = useGetGWPicks(user!.team_id, gw);
  const setShowPlayerSummary = useSetRecoilState(player_summary);
  const generalData = useRecoilValue(general_data) as GeneralData;

  if (isLoading) return <></>;

  return (
    <div className="w-full lg:w-1/2 overflow-x-scroll rounded-lg border grid grid-cols-1">
      <table className="w-full text-left rtl:text-right">
        <thead className="border-b-2">
          <tr className="bg-white">
            <th
              scope="col"
              className="pl-4 pr-2 py-3 font-medium whitespace-nowrap"
            >
              Player
            </th>
            <th scope="col" className="px-2 py-3 font-medium whitespace-nowrap">
              Pos
            </th>
            <th scope="col" className="px-2 py-3 font-medium whitespace-nowrap">
              Team
            </th>
            <th scope="col" className="pl-2 pr-4 py-3 font-medium">
              Points
            </th>
          </tr>
        </thead>

        <tbody>
          {data?.picks.map((p, i) => {
            const { full_name, position, team, points, subbed_in, subbed_out } =
              getElementDetails(generalData, data, p.element);
            const actual_points =
              data.active_chip === "3xc"
                ? parseInt(points ?? "0") * 3
                : p.is_captain
                ? parseInt(points ?? "0") * 2
                : points;

            return (
              <tr
                className={classNames(
                  "bg-white border-b text-sm",
                  i === 10 && "border-blue border-b-2"
                )}
                key={i}
              >
                <td className="pl-4 pr-2 py-3 whitespace-nowrap">
                  <p
                    className="hover:underline cursor-pointer flex items-center gap-1"
                    onClick={() =>
                      setShowPlayerSummary(
                        `${full_name}|${p.element}|${position}`
                      )
                    }
                  >
                    {full_name} {p.is_captain && "(C)"}{" "}
                    {p.is_vice_captain && "(V)"}{" "}
                    {subbed_in && (
                      <IoIosArrowUp className="text-lg text-green" />
                    )}{" "}
                    {subbed_out && (
                      <IoIosArrowUp className="text-lg text-red rotate-180" />
                    )}
                  </p>
                </td>
                <td className="px-2 py-3 whitespace-nowrap">{position}</td>
                <td className="px-2 py-3 whitespace-nowrap">{team}</td>
                <td className="pl-2 pr-4 py-3 whitespace-nowrap">
                  {actual_points}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default GWPicksTable;
