import { History, TopStatsCardProps } from "@/types/dashboard";
import { getTopStats } from "@/utils/helpers";
import { gameweek } from "@/atoms/atoms";
import { useRecoilValue } from "recoil";

const TopStats = ({ data }: { data: History }) => {
  const gw = useRecoilValue(gameweek);

  return (
    <div className="w-full lg:w-1/3 justify-center grid gap-4 lg:grid-cols-1 md:grid-cols-3 rs:grid-cols-2 grid-cols-1">
      {getTopStats(data, gw).map((s, i) => (
        <Card icon={s.icon} title={s.title} value={s.value} key={i} />
      ))}
    </div>
  );
};

const Card = (card: TopStatsCardProps) => {
  return (
    <div className="p-4 bg-white w-full min-w-[14rem] border rounded-lg flex gap-4 items-center">
      <div className="bg-blue bg-opacity-10 p-4 rounded-lg">
        <card.icon className="text-2xl sm:text-3xl text-blue" />
      </div>
      <div>
        <p className="font-medium">{card.title}</p>
        <p className="font-light">{card.value}</p>
      </div>
    </div>
  );
};

export default TopStats;
