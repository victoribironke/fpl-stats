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

export type Chips = "3xc" | "bboost" | "wildcard" | "freehit";

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
    name: Chips;
    time: string;
    event: number;
  }[];
};

export type TopStatsCardProps = {
  icon: IconType;
  title: string;
  value: string | number;
};

export type GWPicks = {
  active_chip: Chips | null;
  automatic_subs:
    | {
        entry: number;
        element_in: number;
        element_out: number;
        event: number;
      }[]
    | null;
  entry_history: {
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
  };
  picks: {
    element: number;
    position: number;
    multiplier: number;
    is_captain: boolean;
    is_vice_captain: boolean;
  }[];
};

export type PlayerSummary = {
  fixtures: {
    id: number;
    code: number;
    team_h: number;
    team_h_score: number | null;
    team_a: number;
    team_a_score: number | null;
    event: number;
    finished: boolean;
    minutes: number;
    provisional_start_time: boolean;
    kickoff_time: string;
    event_name: string;
    is_home: boolean;
    difficulty: number;
  }[];
  history: {
    element: number;
    fixture: number;
    opponent_team: number;
    total_points: number;
    was_home: true;
    kickoff_time: string;
    team_h_score: number;
    team_a_score: number;
    round: number;
    minutes: number;
    goals_scored: number;
    assists: number;
    clean_sheets: number;
    goals_conceded: number;
    own_goals: number;
    penalties_saved: number;
    penalties_missed: number;
    yellow_cards: number;
    red_cards: number;
    saves: number;
    bonus: number;
    bps: number;
    influence: string;
    creativity: string;
    threat: string;
    ict_index: string;
    starts: number;
    expected_goals: string;
    expected_assists: string;
    expected_goal_involvements: string;
    expected_goals_conceded: string;
    value: number;
    transfers_balance: number;
    selected: number;
    transfers_in: number;
    transfers_out: number;
  }[];
  history_past: {
    season_name: string;
    element_code: number;
    start_cost: number;
    end_cost: number;
    total_points: number;
    minutes: number;
    goals_scored: number;
    assists: number;
    clean_sheets: number;
    goals_conceded: number;
    own_goals: number;
    penalties_saved: number;
    penalties_missed: number;
    yellow_cards: number;
    red_cards: number;
    saves: number;
    bonus: number;
    bps: number;
    influence: string;
    creativity: string;
    threat: string;
    ict_index: string;
    starts: number;
    expected_goals: string;
    expected_assists: string;
    expected_goal_involvements: string;
    expected_goals_conceded: string;
  }[];
};

type GeneralDataElements = {
  chance_of_playing_next_round: number;
  chance_of_playing_this_round: number;
  code: number;
  cost_change_event: number;
  cost_change_event_fall: number;
  cost_change_start: number;
  cost_change_start_fall: number;
  dreamteam_count: number;
  element_type: number;
  ep_next: string;
  ep_this: string;
  event_points: number;
  first_name: string;
  form: string;
  id: number;
  in_dreamteam: boolean;
  news: string;
  news_added: string;
  now_cost: number;
  photo: string;
  points_per_game: string;
  second_name: string;
  selected_by_percent: string;
  special: boolean;
  squad_number: number | null;
  status: string;
  team: number;
  team_code: number;
  total_points: number;
  transfers_in: number;
  transfers_in_event: number;
  transfers_out: number;
  transfers_out_event: number;
  value_form: string;
  value_season: string;
  web_name: string;
  minutes: number;
  goals_scored: number;
  assists: number;
  clean_sheets: number;
  goals_conceded: number;
  own_goals: number;
  penalties_saved: number;
  penalties_missed: number;
  yellow_cards: number;
  red_cards: number;
  saves: number;
  bonus: number;
  bps: number;
  influence: string;
  creativity: string;
  threat: string;
  ict_index: string;
  starts: number;
  expected_goals: string;
  expected_assists: string;
  expected_goal_involvements: string;
  expected_goals_conceded: string;
  influence_rank: number;
  influence_rank_type: number;
  creativity_rank: number;
  creativity_rank_type: number;
  threat_rank: number;
  threat_rank_type: number;
  ict_index_rank: number;
  ict_index_rank_type: number;
  corners_and_indirect_freekicks_order: number | null;
  corners_and_indirect_freekicks_text: string;
  direct_freekicks_order: number | null;
  direct_freekicks_text: string;
  penalties_order: number;
  penalties_text: string;
  expected_goals_per_90: number;
  saves_per_90: number;
  expected_assists_per_90: number;
  expected_goal_involvements_per_90: number;
  expected_goals_conceded_per_90: number;
  goals_conceded_per_90: number;
  now_cost_rank: number;
  now_cost_rank_type: number;
  form_rank: number;
  form_rank_type: number;
  points_per_game_rank: number;
  points_per_game_rank_type: number;
  selected_rank: number;
  selected_rank_type: number;
  starts_per_90: number;
  clean_sheets_per_90: number;
};

export type GeneralData = {
  teams: {
    code: number;
    draw: number;
    form: number | null;
    id: number;
    loss: number;
    name: string;
    played: number;
    points: number;
    position: number;
    short_name: string;
    strength: number;
    team_division: number | null;
    unavailable: boolean;
    win: number;
    strength_overall_home: number;
    strength_overall_away: number;
    strength_attack_home: number;
    strength_attack_away: number;
    strength_defence_home: number;
    strength_defence_away: number;
    pulse_id: number;
  }[];
  elements: GeneralDataElements[];
  events: {
    id: number;
    name: string;
    deadline_time: string;
    release_time: null;
    average_entry_score: number;
    finished: boolean;
    data_checked: boolean;
    highest_scoring_entry: number;
    deadline_time_epoch: number;
    deadline_time_game_offset: number;
    highest_score: number;
    is_previous: boolean;
    is_current: boolean;
    is_next: boolean;
    cup_leagues_created: boolean;
    h2h_ko_matches_created: boolean;
    ranked_count: number;
    chip_plays: {
      chip_name: Chips;
      num_played: number;
    }[];
    most_selected: number;
    most_transferred_in: number;
    top_element: number;
    top_element_info: {
      id: number;
      points: number;
    };
    transfers_made: number;
    most_captained: number;
    most_vice_captained: number;
  }[];
};

export type Positions = "GKP" | "DEF" | "MID" | "FWD" | "-";

export interface EvaluatedPlayer extends GeneralDataElements {
  performanceScore: number;
}

export type Fixture = {
  code: number;
  event: number;
  finished: boolean;
  finished_provisional: boolean;
  id: number;
  kickoff_time: string;
  minutes: number;
  provisional_start_time: boolean;
  started: boolean;
  team_a: number;
  team_a_score: number;
  team_h: number;
  team_h_score: number;
  stats: [
    {
      identifier: "goals_scored";
      a: {
        value: number;
        element: number;
      }[];
      h: {
        value: number;
        element: number;
      }[];
    },
    {
      identifier: "assists";
      a: {
        value: number;
        element: number;
      }[];
      h: {
        value: number;
        element: number;
      }[];
    },
    {
      identifier: "own_goals";
      a: {
        value: number;
        element: number;
      }[];
      h: {
        value: number;
        element: number;
      }[];
    },
    {
      identifier: "penalties_saved";
      a: {
        value: number;
        element: number;
      }[];
      h: {
        value: number;
        element: number;
      }[];
    },
    {
      identifier: "penalties_missed";
      a: {
        value: number;
        element: number;
      }[];
      h: {
        value: number;
        element: number;
      }[];
    },
    {
      identifier: "yellow_cards";
      a: {
        value: number;
        element: number;
      }[];
      h: {
        value: number;
        element: number;
      }[];
    },
    {
      identifier: "red_cards";
      a: {
        value: number;
        element: number;
      }[];
      h: {
        value: number;
        element: number;
      }[];
    },
    {
      identifier: "saves";
      a: {
        value: number;
        element: number;
      }[];
      h: {
        value: number;
        element: number;
      }[];
    },
    {
      identifier: "bonus";
      a: {
        value: number;
        element: number;
      }[];
      h: {
        value: number;
        element: number;
      }[];
    },
    {
      identifier: "bps";
      a: {
        value: number;
        element: number;
      }[];
      h: {
        value: number;
        element: number;
      }[];
    }
  ];
  team_h_difficulty: number;
  team_a_difficulty: number;
  pulse_id: number;
};
