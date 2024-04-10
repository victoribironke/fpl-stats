import React from "react";

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
