export interface PredictBase {
  id?: number;
  updated_at: string;
  user: number;
}

export interface PredictData extends PredictBase {
  data: string[];
}

export interface PredictGroup extends PredictBase, PredictGroupPre {
  id?: number;
  updated_at: string;
  user: number;
}

export interface PredictGroupPre {
  group: string;
  pos_1: string;
  pos_2: string;
  pos_3: string;
  pos_4: string;
}
