import React from "react";
import { IconType } from "react-icons";

export type DashboardTemplateProps = {
  children: React.ReactNode;
};

export type User = {
  email: string;
  name: string;
  uid: string;
  team_id: string;
};

export type History = {
  current: {
    event: number;
    points: number;
    total_points: number;
    rank: number;
    rank_sort: number;
    overall_rank: number;
    percentile_rank: number | null;
    bank: number;
    value: number;
    event_transfers: number;
    event_transfers_cost: number;
    points_on_bench: number;
  }[];
  past: [];
  chips: {
    name: "3xc" | "bboost" | "wildcard" | "freehit";
    time: string;
    event: number;
  }[];
};

export type TopStatsCardProps = {
  icon: IconType;
  title: string;
  value: string | number;
};
