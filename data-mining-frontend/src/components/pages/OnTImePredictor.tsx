"use client"

import { useMutation } from "@tanstack/react-query"
import { scoreFlight, type ScoreFlightParams } from "@/api/flights"
import { FlightSearchForm } from "@/components/pages/FlightSearchForm"
import { FlightDetails } from "@/components/pages/FlightDetails"
import type { Flight } from "../../domain/Flight"



export function OnTimePredictor({ setPage }: { setPage: (index: number) => void }) {
  const mutation = useMutation<Flight, Error, ScoreFlightParams>({
    mutationFn: scoreFlight,
  })

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto border-4 border-black">
        {/* Header */}
        <div className="p-8 pb-0">
          <h1 className="text-5xl font-bold mb-6">U.S. Domestic Flights On-Time Analysis</h1>

          {/* Tab Navigation */}
          <div className="flex gap-12 border-b-4 border-black pb-4">
            <button className="text-xl font-bold italic border-b-4 border-black pb-1" onClick={()=>{setPage(1)}}>On-Time Predictor</button>
            <button className="text-xl font-bold italic text-gray-600">Model Comparison</button>
            <button className="text-xl font-bold italic text-gray-600" onClick={()=>{setPage(3)}}>Data Analysis</button>
            <button className="text-xl font-bold italic text-gray-600">Training</button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex gap-8 p-8">
          <FlightSearchForm onSubmit={mutation.mutate} isLoading={mutation.isPending} />

          {mutation.data && <FlightDetails flight={mutation.data} />}

          {mutation.error && <div className="text-red-500 flex-1">Error: {mutation.error.message}</div>}
        </div>
      </div>
    </div>
  )
}
