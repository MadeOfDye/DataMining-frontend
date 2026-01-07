"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { ScoreFlightParams } from "@/api/flights"

interface Props {
  onSubmit: (values: ScoreFlightParams) => void
  isLoading: boolean
}

export function FlightSearchForm({ onSubmit, isLoading }: Props) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    const values: ScoreFlightParams = {
      airline: formData.get("airline") as string,
      flight_number: formData.get("flight_number") as string,
      flight_date: formData.get("flight_date") as string,
      dep_time: (formData.get("dep_time") as string).replace(":", ""),
      model: formData.get("model") as string,
    }

    onSubmit(values)
  }

  return (
    <form onSubmit={handleSubmit} className="w-72 border-4 border-black p-6 space-y-6">
      <h3 className="text-xl font-semibold underline">Select a Flight</h3>

      <div className="space-y-2">
        <Label htmlFor="model" className="text-base italic">
          ML Model
        </Label>
        <Input name="model" id="model" placeholder="knn_v1" required className="border-2 border-black rounded-none" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="flight_number" className="text-base italic">
          Flight No.
        </Label>
        <Input
          name="flight_number"
          id="flight_number"
          placeholder="2151"
          required
          className="border-2 border-black rounded-none"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="airline" className="text-base italic">
          Airline
        </Label>
        <Input name="airline" id="airline" placeholder="AA" required className="border-2 border-black rounded-none" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="flight_date" className="text-base italic">
          Date
        </Label>
        <Input
          type="date"
          name="flight_date"
          id="flight_date"
          required
          className="border-2 border-black rounded-none"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="dep_time" className="text-base italic">
          Time
        </Label>
        <Input type="time" name="dep_time" id="dep_time" required className="border-2 border-black rounded-none" />
      </div>

      <Button
        type="submit"
        className="w-full bg-gray-800 hover:bg-gray-900 text-white font-bold text-lg py-6 rounded-none"
        disabled={isLoading}
      >
        {isLoading ? "SEARCHING..." : "SEARCH"}
      </Button>
    </form>
  )
}
