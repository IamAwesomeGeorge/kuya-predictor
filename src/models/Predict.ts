export interface GroupPredict extends GroupPredictPre {
  id?: number;
  updated_at: string;
  user: number;
}

export interface GroupPredictPre {
  group: string;
  team1: string;
  team2: string;
  team3: string;
  team4: string;
}
