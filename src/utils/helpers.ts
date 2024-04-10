import { History } from "@/types/dashboard";
import { FaRankingStar, FaRegStar } from "react-icons/fa6";
import { IoIosPerson } from "react-icons/io";
import { MdOutlineEventSeat } from "react-icons/md";

export const classNames = (...classes: (string | number | boolean)[]) =>
  classes.filter(Boolean).join(" ");

export const formatNumber = (num: number) => num.toLocaleString("en-US");

export const getTopStats = (data: History) => {
  const gwWhenBBWasUsed = data.chips.find((c) => c.name === "bboost")?.event;
  const currentGW = data?.current.sort((a, b) =>
    a.event < b.event ? 1 : -1
  )[0];
  const totalPointsThisGW =
    gwWhenBBWasUsed === currentGW.event
      ? currentGW.points + currentGW.points_on_bench
      : currentGW.points;
  const pointsPerPlayer = parseFloat(
    (gwWhenBBWasUsed === currentGW.event
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
      value: formatNumber(currentGW.rank),
    },
    {
      icon: MdOutlineEventSeat,
      title: "Points on bench",
      value: formatNumber(currentGW.points_on_bench),
    },
    {
      icon: IoIosPerson,
      title: "Points per player",
      value: formatNumber(pointsPerPlayer),
    },
    {
      icon: FaRegStar,
      title: "Total points",
      value: formatNumber(currentGW.total_points),
    },
  ];
};
