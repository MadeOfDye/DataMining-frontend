import { api } from "@/lib/axios"
import type { Flight } from "../domain/Flight"
import type { Model } from "../domain/Model"

export interface ScoreFlightParams {
  airline: string
  flight_number: string
  flight_date: string // YYYY-MM-DD
  dep_time: string // HHMM
  model: string
}

export interface ScoreFlightParams {
  airline: string
  flight_number: string
  flight_date: string // YYYY-MM-DD
  dep_time: string // HHMM
  model: string
}

export const scoreFlight = async (params: ScoreFlightParams): Promise<Flight> => {

  const response = await api.get<Flight>("/flights/", { params })
  
  return response.data
}


export const modelData = async (): Promise<Model[]> => {

  const response = await api.get<Model[]>("/models-stats/")
  
  return response.data
}
