import { IMAGES } from "@/constants/images";
import {
  EvaluatedPlayer,
  GWPicks,
  GeneralData,
  GeneralDataElement,
  History,
  PlayerSummary,
  Positions,
} from "@/types/dashboard";
import { FaRankingStar, FaRegStar } from "react-icons/fa6";
import { IoIosPerson } from "react-icons/io";
import { MdOutlineEventSeat } from "react-icons/md";

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

  const getBestAndWorstGW = (type: "best" | "worst") => {
    return data.current.sort((a, b) => {
      const aPoints =
        gwWhenBBWasUsed === a.event
          ? (a.points ?? 0) + (a.points_on_bench ?? 0)
          : a.points ?? 0;
      const bPoints =
        gwWhenBBWasUsed === b.event
          ? (b.points ?? 0) + (b.points_on_bench ?? 0)
          : b.points ?? 0;

      return type === "best" ? bPoints - aPoints : aPoints - bPoints;
    })[0];
  };

  const bestGW = getBestAndWorstGW("best");
  const bestGWPoints =
    gwWhenBBWasUsed === bestGW.event
      ? (bestGW.points ?? 0) + (bestGW.points_on_bench ?? 0)
      : bestGW.points ?? 0;

  const worstGW = getBestAndWorstGW("worst");
  const worstGWPoints =
    gwWhenBBWasUsed === worstGW.event
      ? (worstGW.points ?? 0) + (worstGW.points_on_bench ?? 0)
      : worstGW.points ?? 0;

  return [
    {
      icon: FaRegStar,
      title: "Current points",
      value: formatNumber(totalPointsThisGW),
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
    {
      icon: FaRankingStar,
      title: "Best gameweek",
      value: `GW ${bestGW.event} (${bestGWPoints} points)`,
    },
    {
      icon: FaRankingStar,
      title: "Worst gameweek",
      value: `GW ${worstGW.event} (${worstGWPoints} points)`,
    },
    {
      icon: FaRankingStar,
      title: "Gameweek rank",
      value: formatNumber(currentGW?.rank ?? 0),
    },
    {
      icon: FaRankingStar,
      title: "Overall rank",
      value: formatNumber(currentGW?.overall_rank ?? 0),
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
  const chance_of_playing_next_round = elementObj?.chance_of_playing_next_round;
  const chance_of_playing_this_round = elementObj?.chance_of_playing_this_round;

  return {
    full_name,
    position,
    team,
    points,
    subbed_in,
    subbed_out,
    web_name: elementObj?.web_name,
    chance_of_playing_next_round,
    chance_of_playing_this_round,
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

    ipswich: { player: IMAGES.ipswich.src, gk: IMAGES.ipswich_gk.src },
    leicester: {
      player: IMAGES.leicester_city.src,
      gk: IMAGES.leicester_city_gk.src,
    },
    southampton: {
      player: IMAGES.southampton.src,
      gk: IMAGES.southampton_gk.src,
    },
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

const evaluatePlayers = (players: GeneralData["elements"]): EvaluatedPlayer[] =>
  players.map((player) => {
    const positions = ["GKP", "DEF", "MID", "FWD", "-"];
    const p = positions[player.element_type ? player.element_type - 1 : 4];

    const criteriaWithWeights = [
      { criterion: player.form, weight: 3 },
      { criterion: player.points_per_game, weight: 2 }, // Increased weight for points per game
      { criterion: player.total_points.toString(), weight: 1 },
      {
        criterion: player.creativity,
        weight: p === "GKP" || p === "DEF" ? 1 : 3,
      },
      { criterion: player.minutes.toString(), weight: 1.5 },
      {
        criterion: player.goals_scored.toString(),
        weight: p === "GKP" ? 1 : p === "DEF" ? 1.5 : p === "MID" ? 2 : 3,
      },
      {
        criterion: player.goals_conceded.toString(),
        weight: p === "GKP" || p === "DEF" ? -3 : p === "MID" ? -1.5 : -1,
      },
      {
        criterion: player.assists.toString(),
        weight: p === "FWD" || p === "MID" ? 3 : p === "DEF" ? 1.5 : 1,
      },
      {
        criterion: player.clean_sheets.toString(),
        weight: p === "GKP" ? 3 : p === "DEF" ? 2 : p === "MID" ? 1.5 : 1,
      },
      { criterion: player.selected_by_percent, weight: 2 },
      {
        criterion: player.expected_goal_involvements,
        weight: p === "GKP" ? 1.5 : p === "DEF" || p === "MID" ? 2 : 1, // Changed negative weight to positive for forwards
      },
      { criterion: player.influence, weight: 2 }, // Added influence
      { criterion: player.expected_assists, weight: 1.5 }, // Added expected assists
      { criterion: player.bonus.toString(), weight: 1.5 }, // Added bonus points
    ];

    return {
      ...player,
      performanceScore: criteriaWithWeights.reduce(
        (a, b) => a + parseFloat(b.criterion) * b.weight,
        0
      ),
      position: p,
    };
  });

export const evaluatePlayer = (player: GeneralDataElement): EvaluatedPlayer => {
  const positions = ["GKP", "DEF", "MID", "FWD", "-"];
  const p = positions[player.element_type ? player.element_type - 1 : 4];

  const criteriaWithWeights = [
    { criterion: player.form, weight: 3 },
    { criterion: player.points_per_game, weight: 2 }, // Increased weight for points per game
    { criterion: player.total_points.toString(), weight: 1 },
    {
      criterion: player.creativity,
      weight: p === "GKP" || p === "DEF" ? 1 : 3,
    },
    { criterion: player.minutes.toString(), weight: 1.5 },
    {
      criterion: player.goals_scored.toString(),
      weight: p === "GKP" ? 1 : p === "DEF" ? 1.5 : p === "MID" ? 2 : 3,
    },
    {
      criterion: player.goals_conceded.toString(),
      weight: p === "GKP" || p === "DEF" ? -3 : p === "MID" ? -1.5 : -1,
    },
    {
      criterion: player.assists.toString(),
      weight: p === "FWD" || p === "MID" ? 3 : p === "DEF" ? 1.5 : 1,
    },
    {
      criterion: player.clean_sheets.toString(),
      weight: p === "GKP" ? 3 : p === "DEF" ? 2 : p === "MID" ? 1.5 : 1,
    },
    { criterion: player.selected_by_percent, weight: 2 },
    {
      criterion: player.expected_goal_involvements,
      weight: p === "GKP" ? 1.5 : p === "DEF" || p === "MID" ? 2 : 1, // Changed negative weight to positive for forwards
    },
    { criterion: player.influence, weight: 2 }, // Added influence
    { criterion: player.expected_assists, weight: 1.5 }, // Added expected assists
    { criterion: player.bonus.toString(), weight: 1.5 }, // Added bonus points
  ];

  return {
    ...player,
    performanceScore: criteriaWithWeights.reduce(
      (a, b) => a + parseFloat(b.criterion) * b.weight,
      0
    ),
    position: p,
  };
};

const calculateAveragePerformance = (
  currentTeam: GWPicks,
  evaluatedPlayers: EvaluatedPlayer[]
) => {
  const totalScore = currentTeam.picks.reduce((sum, player) => {
    const performanceScore = evaluatedPlayers.find(
      (e) => e.id === player.element
    )?.performanceScore;

    return sum + (performanceScore ?? 0);
  }, 0);

  return totalScore / currentTeam.picks.length;
};

export const suggestTransfers = (
  currentTeam: GWPicks,
  players: GeneralData["elements"]
) => {
  const evaluatedPlayers = evaluatePlayers(players);
  const averagePerformance = calculateAveragePerformance(
    currentTeam,
    evaluatedPlayers
  );
  const goodPlayers = evaluatedPlayers.filter(
    (player) => player.performanceScore > averagePerformance
  );

  const suggestedTransfers: EvaluatedPlayer[] = [];

  suggestedTransfers.push(...goodPlayers);

  return Array.from(new Set(suggestedTransfers))
    .filter((a) => {
      // Remove players that are in their current team
      const playerInCurrentTeam = currentTeam.picks.find(
        (b) => b.element === a.id
      );

      if (!playerInCurrentTeam) return a;
    })
    .sort((a, b) => b.performanceScore - a.performanceScore) // Sort by their performance score
    .filter((a) => {
      // Remove players that are not fit
      return (
        a.chance_of_playing_this_round >= 75 &&
        a.chance_of_playing_next_round >= 75
      );
    });
};

export const getPlayerImageUrl = (player?: GeneralDataElement): string => {
  if (!player) {
    return "player-placeholder.png";
  }

  const imgId = player.photo.replace(".jpg", "");

  return `https://resources.premierleague.com/premierleague/photos/players/110x140/p${imgId}.png`;
};

export const analysisStatistics = [
  {
    title: "Name",
    selector: "name",
  },
  {
    title: "Team",
    selector: "team",
  },
  {
    title: "Minutes played",
    selector: "minutes",
    format: true,
  },
  {
    title: "Goals scored",
    selector: "goals_scored",
  },
  {
    title: "Assists",
    selector: "assists",
  },
  {
    title: "Clean sheets",
    selector: "clean_sheets",
  },
  {
    title: "Goals conceded",
    selector: "goals_conceded",
  },
  {
    title: "Own goals",
    selector: "own_goals",
  },
  {
    title: "Penalties saved",
    selector: "penalties_saved",
  },
  {
    title: "Penalties missed",
    selector: "penalties_missed",
  },
  {
    title: "Yellow cards",
    selector: "yellow_cards",
  },
  {
    title: "Red cards",
    selector: "red_cards",
  },
  {
    title: "Saves",
    selector: "saves",
  },
  {
    title: "Bonus",
    selector: "bonus",
  },
  {
    title: "Influence",
    selector: "influence",
  },
  {
    title: "Creativity",
    selector: "creativity",
  },
  {
    title: "Performance score",
    selector: "performanceScore",
    format: true,
  },
];
