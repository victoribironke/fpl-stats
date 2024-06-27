import {
  gameweek,
  general_data,
  player_summary,
  user_details,
} from "@/atoms/atoms";
import { useGetGWPicks } from "@/hooks/dashboard";
import { GeneralData } from "@/types/dashboard";
import { getElementDetails, getJersey } from "@/utils/helpers";
import { IoIosArrowUp } from "react-icons/io";
import { useRecoilValue, useSetRecoilState } from "recoil";

const GWPicksTable = () => {
  const gw = useRecoilValue(gameweek);
  const user = useRecoilValue(user_details);
  const { data, isLoading } = useGetGWPicks(user!.team_id, gw);
  const generalData = useRecoilValue(general_data) as GeneralData;

  const lineup = data?.picks.map((p) => {
    const { element, is_captain, is_vice_captain } = p;

    const elementDetails = getElementDetails(generalData, data, element);
    const actual_points =
      data.active_chip === "3xc"
        ? parseInt(elementDetails.points ?? "0") * 3
        : p.is_captain
        ? parseInt(elementDetails.points ?? "0") * 2
        : elementDetails.points;

    const jersey = getJersey(elementDetails.team!, elementDetails.position);

    return {
      ...elementDetails,
      actual_points,
      jersey,
      element,
      is_captain,
      is_vice_captain,
    };
  });

  const startingXI = lineup?.slice(0, 11);
  const bench = lineup?.slice(11);

  if (isLoading) return <></>;

  return (
    <div className="w-full lg:w-2/3 bg-white p-4 overflow-x-scroll rounded-lg border grid grid-cols-1 gap-4">
      <p className="font-medium text-lg">GW picks</p>

      <div className="w-full pitch py-4 rounded-lg relative overflow-hidden flex items-center justify-center flex-col">
        <div className="w-full flex items-center justify-evenly py-4 gap-2 px-2 z-10">
          {startingXI
            ?.filter((l) => l.position === "GKP")
            .map((l, i) => (
              <Row l={l} key={i} />
            ))}
        </div>

        <div className="w-full flex items-center justify-evenly py-4 gap-2 px-2 z-10">
          {startingXI
            ?.filter((l) => l.position === "DEF")
            .map((l, i) => (
              <Row l={l} key={i} />
            ))}
        </div>

        <div className="w-full flex items-center justify-evenly py-4 gap-2 px-2 z-10">
          {startingXI
            ?.filter((l) => l.position === "MID")
            .map((l, i) => (
              <Row l={l} key={i} />
            ))}
        </div>

        <div className="w-full flex items-center justify-evenly py-4 gap-2 px-2 z-10">
          {startingXI
            ?.filter((l) => l.position === "FWD")
            .map((l, i) => (
              <Row l={l} key={i} />
            ))}
        </div>

        {/* Pitch elements */}
        <div className="absolute border-4 border-white w-20 h-20 -top-10 -left-10 rounded-full z-0" />
        <div className="absolute border-4 border-white w-20 h-20 -top-10 -right-10 rounded-full z-0" />
        <div className="absolute border-4 border-white w-20 h-20 -bottom-10 -left-10 rounded-full z-0" />
        <div className="absolute border-4 border-white w-20 h-20 -bottom-10 -right-10 rounded-full z-0" />

        <div className="absolute border-4 border-white w-[8.5rem] h-[8.5rem] rounded-full z-0" />
        <div className="absolute border-2 border-white w-full z-0" />

        <div className="absolute border-4 border-white w-[30%] h-20 -top-2 z-0" />
        <div className="absolute border-4 border-white w-[50%] h-36 -top-2 z-0" />

        <div className="absolute border-4 border-white w-[30%] h-20 -bottom-2 z-0" />
        <div className="absolute border-4 border-white w-[50%] h-36 -bottom-2 z-0" />
      </div>

      <div className="w-full pitch py-4 rounded-lg relative overflow-hidden flex items-center justify-center flex-col">
        <div className="w-full flex items-center justify-evenly py-4 gap-2 px-2">
          {bench?.map((l, i) => (
            <Row l={l} key={i} />
          ))}
        </div>

        <div className="absolute border-4 border-white w-20 h-20 -top-10 -left-10 rounded-full z-0"></div>
        <div className="absolute border-4 border-white w-20 h-20 -top-10 -right-10 rounded-full z-0"></div>
        <div className="absolute border-4 border-white w-20 h-20 -bottom-10 -left-10 rounded-full z-0"></div>
        <div className="absolute border-4 border-white w-20 h-20 -bottom-10 -right-10 rounded-full z-0"></div>
      </div>
    </div>
  );
};

const Row = ({ l }: { l: any }) => {
  const setShowPlayerSummary = useSetRecoilState(player_summary);

  return (
    <div
      onClick={() =>
        setShowPlayerSummary(`${l.full_name}|${l.element}|${l.position}`)
      }
      className="relative rounded-b-md overflow-hidden w-full cursor-pointer max-w-32 flex flex-col items-center justify-center"
    >
      <img
        src={l.jersey}
        alt="team jersey"
        className="mb-2 w-full max-w-[40%]"
      />
      <p className="bg-blue w-full rounded-t-md text-xs md:text-sm text-white px-2 py-0.5 text-center whitespace-nowrap overflow-hidden text-ellipsis font-medium">
        {l.web_name}
      </p>
      <p className="bg-white w-full text-xs md:text-sm px-2 py-0.5 text-center font-medium">
        {l.actual_points}
      </p>

      <div className="absolute flex flex-col right-0 top-0 gap-2">
        {(l.is_captain || l.is_vice_captain) && (
          <p className="text-white bg-blue w-7 h-7 text-sm flex items-center justify-center rounded-md">
            {l.is_captain && "(C)"} {l.is_vice_captain && "(V)"}
          </p>
        )}

        {(l.subbed_in || l.subbed_out) && (
          <p className="bg-white w-7 h-6 text-sm flex items-center justify-center rounded-md">
            {l.subbed_in && <IoIosArrowUp className="text-lg text-green" />}{" "}
            {l.subbed_out && (
              <IoIosArrowUp className="text-lg text-red rotate-180" />
            )}
          </p>
        )}
      </div>
    </div>
  );
};

export default GWPicksTable;
