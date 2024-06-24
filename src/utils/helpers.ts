import { gameweek } from "@/atoms/atoms";
import { IMAGES } from "@/constants/images";
import {
  GWPicks,
  GeneralData,
  History,
  PlayerSummary,
  Positions,
} from "@/types/dashboard";
import { FaRankingStar, FaRegStar } from "react-icons/fa6";
import { IoIosPerson } from "react-icons/io";
import { MdOutlineEventSeat } from "react-icons/md";
import { useRecoilValue } from "recoil";

export const classNames = (...classes: (string | number | boolean)[]) =>
  classes.filter(Boolean).join(" ");

export const formatNumber = (num: number) => num.toLocaleString("en-US");

export const getTopStats = (data: History, gw: string) => {
  const gwWhenBBWasUsed = data.chips.find((c) => c.name === "bboost")?.event;
  const currentGW = data.current.find((c) => c.event.toString() === gw);
  const totalPointsThisGW =
    gwWhenBBWasUsed === currentGW?.event
      ? (currentGW?.points ?? 0) + (currentGW?.points_on_bench ?? 0)
      : currentGW?.points ?? 0;
  const pointsPerPlayer = parseFloat(
    (gwWhenBBWasUsed === currentGW?.event
      ? totalPointsThisGW / 15
      : totalPointsThisGW / 11
    ).toFixed(2)
  );

  return [
    {
      icon: FaRegStar,
      title: "Current points",
      value: formatNumber(totalPointsThisGW),
    },
    {
      icon: FaRankingStar,
      title: "GW rank",
      value: formatNumber(currentGW?.rank ?? 0),
    },
    {
      icon: MdOutlineEventSeat,
      title: "Points on bench",
      value: formatNumber(currentGW?.points_on_bench ?? 0),
    },
    {
      icon: IoIosPerson,
      title: "Points per player",
      value: formatNumber(pointsPerPlayer),
    },
    {
      icon: FaRegStar,
      title: "Total points",
      value: formatNumber(currentGW?.total_points ?? 0),
    },
  ];
};

export const getElementDetails = (
  data: GeneralData,
  gw_data: GWPicks,
  element: number
) => {
  const positions: Positions[] = ["GKP", "DEF", "MID", "FWD", "-"];
  const elementObj = data?.elements.find((e) => e.id === element);
  const elementsSubbedIn = gw_data.automatic_subs?.map((s) => s.element_in);
  const elementsSubbedOut = gw_data.automatic_subs?.map((s) => s.element_out);

  const full_name = elementObj?.first_name + " " + elementObj?.second_name;
  const position =
    positions[elementObj?.element_type ? elementObj.element_type - 1 : 4];
  const team = data.teams.find((t) => t.id === elementObj?.team)?.name;
  const points = elementObj?.event_points.toString();
  const subbed_in = (elementsSubbedIn ?? []).includes(element);
  const subbed_out = (elementsSubbedOut ?? []).includes(element);

  return {
    full_name,
    position,
    team,
    points,
    subbed_in,
    subbed_out,
    web_name: elementObj?.web_name,
  };
};

export const calculateFPLPoints = (
  data: PlayerSummary,
  gw: number,
  position: string
) => {
  const currGW = data.history.find((h) => h.round === gw)!;

  const points = [
    {
      statistic: "Minutes played",
      value: currGW.minutes,
      points: getPoints(position, "MinutesPlayed", currGW.minutes),
    },
    {
      statistic: "Goals scored",
      value: currGW.goals_scored,
      points: getPoints(position, "GoalsScored", currGW.goals_scored),
    },
    {
      statistic: "Assists",
      value: currGW.assists,
      points: getPoints(position, "Assists", currGW.assists),
    },
    {
      statistic: "Clean sheets",
      value: currGW.clean_sheets,
      points: getPoints(position, "CleanSheet", currGW.clean_sheets),
    },
    {
      statistic: "Saves",
      value: currGW.saves,
      points: getPoints(position, "ShotsSaved", currGW.saves),
    },
    {
      statistic: "Penalties missed",
      value: currGW.penalties_missed,
      points: getPoints(position, "PenaltyMiss", currGW.penalties_missed),
    },
    {
      statistic: "Penalties saved",
      value: currGW.penalties_saved,
      points: getPoints(position, "PenaltySave", currGW.penalties_saved),
    },
    {
      statistic: "Yellow cards",
      value: currGW.yellow_cards,
      points: getPoints(position, "YellowCard", currGW.yellow_cards),
    },
    {
      statistic: "Red cards",
      value: currGW.red_cards,
      points: getPoints(position, "RedCard", currGW.red_cards),
    },
    {
      statistic: "Own goals",
      value: currGW.own_goals,
      points: getPoints(position, "OwnGoal", currGW.own_goals),
    },
    {
      statistic: "Goals conceded",
      value: currGW.goals_conceded,
      points: getPoints(position, "GoalsConceded", currGW.goals_conceded),
    },
    {
      statistic: "Bonus points",
      value: currGW.bonus,
      points: currGW.bonus,
    },
  ];

  return points.filter(
    (p) => p.points !== 0 || p.statistic === "Minutes played"
  );
};

const getPoints = (position: string, statistic: string, value: number) => {
  switch (statistic) {
    case "GoalsScored":
      return position === "Goalkeeper" || position === "Defender"
        ? value * 6
        : position === "Midfielder"
        ? value * 5
        : position === "Forward"
        ? value * 4
        : 0;
    case "Assists":
      return value * 3;
    case "MinutesPlayed":
      return value === 0 ? 0 : value >= 60 ? 2 : 1;
    case "CleanSheet":
      return position === "Goalkeeper" || position === "Defender"
        ? value * 4
        : position === "Midfielder"
        ? value * 1
        : 0;
    case "ShotsSaved":
      return Math.floor(value / 3);
    case "PenaltyMiss":
      return value * -2;
    case "PenaltySave":
      return value * 5;
    case "YellowCard":
      return value * -1;
    case "RedCard":
      return value * -3;
    case "OwnGoal":
      return value * -2;
    case "GoalsConceded":
      return (position === "Goalkeeper" || position === "Defender") && value > 0
        ? Math.floor(value / 2) * -1
        : 0;
    default:
      return 0;
  }
};

export const getJersey = (team: string, pos: Positions) => {
  const jerseyMap = {
    arsenal: { player: IMAGES.arsenal.src, gk: IMAGES.arsenal_gk.src },
    aston_villa: {
      player: IMAGES.aston_villa.src,
      gk: IMAGES.aston_villa_gk.src,
    },
    bournemouth: {
      player: IMAGES.bournemouth.src,
      gk: IMAGES.bournemouth_gk.src,
    },
    brentford: { player: IMAGES.brentford.src, gk: IMAGES.brentford_gk.src },
    brighton: { player: IMAGES.brighton.src, gk: IMAGES.brighton_gk.src },
    chelsea: { player: IMAGES.chelsea.src, gk: IMAGES.chelsea_gk.src },
    crystal_palace: {
      player: IMAGES.crystal_palace.src,
      gk: IMAGES.crystal_palace_gk.src,
    },
    everton: { player: IMAGES.everton.src, gk: IMAGES.everton_gk.src },
    fulham: { player: IMAGES.fulham.src, gk: IMAGES.fulham_gk.src },
    liverpool: { player: IMAGES.liverpool.src, gk: IMAGES.liverpool_gk.src },
    man_city: { player: IMAGES.man_city.src, gk: IMAGES.man_city_gk.src },
    man_utd: { player: IMAGES.man_united.src, gk: IMAGES.man_united_gk.src },
    newcastle: { player: IMAGES.newcastle.src, gk: IMAGES.newcastle_gk.src },
    nottm_forest: {
      player: IMAGES.nottingham_forest.src,
      gk: IMAGES.nottingham_forest_gk.src,
    },
    spurs: { player: IMAGES.tottenham.src, gk: IMAGES.tottenham_gk.src },
    west_ham: { player: IMAGES.west_ham.src, gk: IMAGES.west_ham_gk.src },
    wolves: { player: IMAGES.wolves.src, gk: IMAGES.wolves_gk.src },
  };

  const reformedTeamName = team
    .toLowerCase()
    .split("'")
    .join("")
    .split(" ")
    .join("_");

  const t = jerseyMap[reformedTeamName as keyof typeof jerseyMap];

  if (t) return pos === "GKP" ? t.gk : t.player;

  return "";
};

export const getInFormPlayers = (
  players: GeneralData["elements"],
  minForm = 5.0
) => {
  const minMinutes = getMinimumMinutes();

  return players
    ?.filter((p) => parseFloat(p.form) >= minForm && p.minutes >= minMinutes)
    .sort((a, b) => (a.minutes < b.minutes ? 1 : -1));
};

export const suggestTransfers = (
  players: GeneralData["elements"],
  teams: GeneralData["teams"],
  difficultyThreshold = 1200
) => {
  const minMinutes = getMinimumMinutes();
  const suggestedTransfers: GeneralData["elements"] = [];

  players?.forEach((player) => {
    const team = teams?.find((team) => team.id === player.team);

    if (team && team.strength_overall_home < difficultyThreshold) {
      if (player.chance_of_playing_this_round >= 75) {
        if (player.minutes >= minMinutes) {
          suggestedTransfers.push(player);
        }
      }
    }
  });

  return suggestedTransfers.sort((a, b) => (a.minutes < b.minutes ? 1 : -1));
};

export const getMinimumMinutes = () => {
  const gw = useRecoilValue(gameweek);
  const minMinutes = (90 * parseInt(gw)) / 2;

  return minMinutes;
};
