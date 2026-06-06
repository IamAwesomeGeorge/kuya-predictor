export interface GroupPredict extends GroupPredictPre {
  id?: number;
  updated_at: string;
  user: number;
}

export interface GroupPredictPre {
  group: string;
  pos_1: string;
  pos_2: string;
  pos_3: string;
  pos_4: string;
}
