import { api } from "@/lib/axios"
import type { Flight } from "../domain/Flight"

export interface ScoreFlightParams {
  airline: string
  flight_number: string
  flight_date: string // YYYY-MM-DD
  dep_time: string // HHMM
  model: string
}

export const scoreFlight = async (params: ScoreFlightParams): Promise<Flight> => {
  const response = await api.get<Flight>("/score-flight/", { params })
  return response.data
}
