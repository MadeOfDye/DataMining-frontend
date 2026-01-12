export interface Feature {
    feature_name: string
    feature_importance: number
}

export interface Model {
  model_name: string
  tp: number
  fp: number
  tn: number
  fn: number
  accuracy: number
  precision?: number
  recall?: number
  f1_score?: number
  auc?: number
  features?: Feature[]
}
