import { general_data, player_select, selected_players } from "@/atoms/atoms";
import { GeneralData, Positions } from "@/types/dashboard";
import { classNames } from "@/utils/helpers";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

const PlayerSelect = () => {
  const [selectedPlayers, setSelectedPlayers] =
    useRecoilState(selected_players);
  const setShowPlayerSelect = useSetRecoilState(player_select);
  const generalData = useRecoilValue(general_data) as GeneralData;
  const [search, setSearch] = useState("");

  const filteredPlayers = generalData.elements
    .filter((e) => {
      const full_name = `${e.first_name} ${e.second_name}`;

      return full_name.toLowerCase().includes(search.toLowerCase());
    })
    .sort((a, b) => b.total_points - a.total_points);

  const positions: Positions[] = ["GKP", "DEF", "MID", "FWD", "-"];
  const [page, setPage] = useState(1);
  const d = filteredPlayers.length / 10;
  const c = Number.isInteger(d)
    ? page !== Math.floor(d)
    : page !== Math.floor(d) + 1;

  useEffect(() => setPage(1), [search]);

  return (
    <>
      <div className="w-full gap-4 flex justify-center flex-col sm:flex-row">
        <input
          type="text"
          className="w-full border-2 border-blue rounded-lg px-3 py-2 outline-none"
          placeholder="Search for player by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          className="px-4 py-1 rounded-md bg-blue text-white"
          onClick={() => setShowPlayerSelect(false)}
        >
          Confirm
        </button>
      </div>

      <div className="w-full mt-4 overflow-x-scroll rounded-lg border grid grid-cols-1">
        <table className="w-full text-left rtl:text-right">
          <thead className="border-b-2">
            <tr className="bg-white">
              <th
                scope="col"
                className="pl-4 pr-2 py-3 font-medium whitespace-nowrap"
              >
                Name
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
                Position
              </th>
              <th
                scope="col"
                className="px-2 py-3 font-medium whitespace-nowrap"
              >
                Price
              </th>
              <th scope="col" className="pl-2 pr-4 py-3 font-medium">
                Total points
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredPlayers.slice(page * 10 - 10, page * 10).map((f, i) => {
              const full_name = `${f.first_name} ${f.second_name}`;
              const team = generalData.teams.find((e) => e.id === f.team);
              const position =
                positions[f.element_type ? f.element_type - 1 : 4];

              return (
                <tr
                  className={classNames(
                    "border-b text-sm cursor-pointer",
                    selectedPlayers.includes(f.id)
                      ? "bg-blue bg-opacity-20"
                      : "hover:bg-gray-50 bg-white"
                  )}
                  key={i}
                  onClick={() =>
                    setSelectedPlayers((k) =>
                      k.includes(f.id)
                        ? k.filter((i) => i !== f.id)
                        : selectedPlayers.length <= 5
                        ? [...k, f.id]
                        : k
                    )
                  }
                >
                  <td className="pl-4 font-medium pr-2 py-3 whitespace-nowrap">
                    {full_name}
                  </td>
                  <td className="px-2 py-3 whitespace-nowrap">{team?.name}</td>
                  <td className="px-2 py-3 whitespace-nowrap">{position}</td>
                  <td className="px-2 py-3 whitespace-nowrap">
                    {f.now_cost / 10}m
                  </td>

                  <td className="pl-2 pr-4 py-3 whitespace-nowrap">
                    {f.total_points}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="py-4 flex items-center justify-center gap-2 flex-col rs:flex-row">
        <p className="text-sm rs:mr-auto">
          Showing {page * 10 - 9} to{" "}
          {c
            ? filteredPlayers.length < 10
              ? filteredPlayers.length
              : page * 10
            : filteredPlayers.length}{" "}
          of {filteredPlayers.length} players
        </p>

        <div className="flex gap-2">
          <button
            className="text-sm border py-1.5 px-3 shadow rounded-md hover:shadow-md disabled:cursor-not-allowed"
            onClick={() => page !== 1 && setPage((p) => p - 1)}
            disabled={page === 1}
          >
            Previous
          </button>
          <button
            className="text-sm border py-1.5 px-3 shadow rounded-md hover:shadow-md disabled:cursor-not-allowed"
            onClick={() => c && setPage((p) => p + 1)}
            disabled={!c}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};
export default PlayerSelect;
