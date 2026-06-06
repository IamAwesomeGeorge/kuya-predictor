export interface GroupPredict extends GroupPredictPre {
  id?: number;
  updated_at: string;
  user: number;
}

export interface GroupPredictPre {
  group: number;
  team1: number;
  team2: number;
  team3: number;
  team4: number;
}