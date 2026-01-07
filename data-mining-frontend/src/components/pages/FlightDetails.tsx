import { PredictionBadge } from "./PredictionBadge"
import type { Flight } from "../../domain/Flight"

interface FlightDetailsProps {
  flight: Flight
}

export function FlightDetails({ flight }: FlightDetailsProps) {
  const formatDate = (dateString: string) => {
    return dateString
  }

  const formatTime = (time: string) => {
    // Format time from HHMM to HH:MM
    if (time.length === 4) {
      return `${time.slice(0, 2)}:${time.slice(2)}`
    }
    return time
  }

  return (
    <div className="flex-1 space-y-8">
      {/* Header with flight number and airline */}
      <div className="flex items-start justify-between gap-8">
        <div className="space-y-2">
          <div className="flex items-baseline gap-8">
            <h2 className="text-6xl font-bold">{flight.flight_number_airline}</h2>
            <h2 className="text-5xl font-normal">{flight.airline_network}</h2>
          </div>
          <p className="text-xl italic">
            {flight.manufacturer} {flight.plane_model} ({new Date().getFullYear() - flight.year_manufactured} years old)
          </p>
          <p className="text-xl">
            Last Flight:{" "}
            <span className={flight.prev_f_delay > 0 ? "text-red-500 font-bold" : "text-green-500 font-bold"}>
              {flight.prev_f_delay > 0 ? "LATE" : "ON TIME"}
            </span>
          </p>
        </div>
      </div>

      {/* Flight route and prediction */}
      <div className="grid grid-cols-[1fr,1fr,auto] gap-12">
        {/* Departs from */}
        <div className="space-y-1">
          <h4 className="font-bold text-xl mb-3">Departs from</h4>
          <p className="text-lg">
            {flight.origin} - {flight.origin_city_name}
          </p>
          <p className="text-lg">{formatTime(flight.crs_dep_time)} EST</p>
          <p className="text-lg">{formatDate(flight.flight_date)}</p>
          <p className="text-lg">{flight.origin_sky_clearness || "Clear Skies"}</p>
        </div>

        {/* Arrives to */}
        <div className="space-y-1">
          <h4 className="font-bold text-xl mb-3">Arrives to</h4>
          <p className="text-lg">
            {flight.destination} - {flight.dest_city_name}
          </p>
          <p className="text-lg">{formatTime(flight.crs_arr_time)} CST</p>
          <p className="text-lg">{formatDate(flight.flight_date)}</p>
          <p className="text-lg">{flight.dest_sky_clearness || "Rainy"}</p>
        </div>

        {/* Prediction */}
        <div className="space-y-1">
          <h4 className="font-bold text-xl mb-3">Prediction</h4>
          <PredictionBadge prediction={flight.prediction || "UNKNOWN"} />
        </div>
      </div>

      {/* Statistics */}
      <div className="space-y-1">
        <h4 className="font-bold text-xl mb-2">Statistics</h4>
        <p className="text-lg">
          Duration: {Math.floor(flight.distance / 800)}h {Math.floor((flight.distance % 800) / 13)}m
        </p>
        <p className="text-lg">Percentage Late: {flight.prev_f_delay > 0 ? "50" : "20"}%</p>
      </div>

      {/* Flight Aware Link */}
      <div className="text-sm">
        <span>Flight Aware: </span>
        <a
          href={`https://www.flightaware.com/live/flight/${flight.flight_number_airline}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          https://www.flightaware.com/live/flight/{flight.flight_number_airline}
        </a>
      </div>
    </div>
  )
}
