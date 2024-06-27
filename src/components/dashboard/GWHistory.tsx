import { user_details } from "@/atoms/atoms";
import { History } from "@/types/dashboard";
import { formatNumber } from "@/utils/helpers";
import Link from "next/link";
import { useRecoilValue } from "recoil";

const GWHistory = ({ data }: { data: History }) => {
  const user = useRecoilValue(user_details);

  return (
    <div className="w-full mt-2 overflow-x-scroll rounded-lg border grid grid-cols-1">
      <table className="w-full text-left rtl:text-right">
        <thead className="border-b-2">
          <tr className="bg-white">
            <th
              scope="col"
              className="pl-4 pr-2 py-3 font-medium whitespace-nowrap"
              title="Gameweek"
            >
              Gw
            </th>
            <th
              scope="col"
              className="px-2 py-3 font-medium whitespace-nowrap"
              title="Gameweek points"
            >
              GwP
            </th>
            <th
              scope="col"
              className="px-2 py-3 font-medium whitespace-nowrap"
              title="Overall points"
            >
              OP
            </th>
            <th
              scope="col"
              className="px-2 py-3 font-medium whitespace-nowrap"
              title="Points on bench"
            >
              PB
            </th>
            <th
              scope="col"
              className="px-2 py-3 font-medium whitespace-nowrap"
              title="Transfers made"
            >
              TM
            </th>
            <th
              scope="col"
              className="px-2 py-3 font-medium whitespace-nowrap"
              title="Transfers cose"
            >
              TC
            </th>
            <th
              scope="col"
              className="px-2 py-3 font-medium whitespace-nowrap"
              title="Squad value"
            >
              SV
            </th>
            <th
              scope="col"
              className="px-2 py-3 font-medium whitespace-nowrap"
              title="Gameweek rank"
            >
              GwR
            </th>
            <th
              scope="col"
              className="pl-2 pr-4 py-3 font-medium"
              title="Overall rank"
            >
              OR
            </th>
          </tr>
        </thead>

        <tbody>
          {data?.current
            .sort((a, b) => (a.event < b.event ? 1 : -1))
            .map((c, i) => (
              <tr className="bg-white border-b text-sm" key={i}>
                <td className="pl-4 text-blue font-medium pr-2 py-3 whitespace-nowrap hover:underline cursor-pointer">
                  <Link
                    href={`https://fantasy.premierleague.com/entry/${user?.team_id}/event/${c.event}`}
                    target="_blank"
                  >
                    GW{c.event}
                  </Link>
                </td>
                <td className="px-2 py-3 whitespace-nowrap">
                  {formatNumber(c.points)}
                </td>
                <td className="px-2 py-3 whitespace-nowrap">
                  {formatNumber(c.total_points)}
                </td>
                <td className="px-2 py-3 whitespace-nowrap">
                  {formatNumber(c.points_on_bench)}
                </td>
                <td className="px-2 py-3 whitespace-nowrap">
                  {formatNumber(c.event_transfers)}
                </td>
                <td className="px-2 py-3 whitespace-nowrap">
                  {formatNumber(c.event_transfers_cost)}
                </td>
                <td className="px-2 py-3 whitespace-nowrap">
                  €{formatNumber(c.value / 10)}
                </td>
                <td className="px-2 py-3 whitespace-nowrap">
                  {formatNumber(c.rank)}
                </td>
                <td className="pl-2 pr-4 py-3 whitespace-nowrap">
                  {formatNumber(c.overall_rank)}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default GWHistory;
