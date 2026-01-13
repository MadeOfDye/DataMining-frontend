import { PredictionBadge } from "./PredictionBadge"
import type { Flight } from "../../domain/Flight"

interface FlightDetailsProps {
  flight: Flight
}

export function FlightDetails({ flight }: FlightDetailsProps) {
  const formatDate = (dateString: string) => {

    let date_format: any = {
      day:"2-digit",
      month: "short",
      year: "2-digit",
      hour:"2-digit",
      minute: "2-digit",
      hour12: true,
    }

    return new Date(dateString).toLocaleString('en-GB',  date_format)
  }

  const Temp = ({ origin_dest }: { origin_dest: string }) => {

    let temp;

    if (origin_dest == "origin") 
      temp = flight.origin_temp
    else
      temp = flight.dest_temp
    
    if (temp)
      return <p className="text-lg">{temp.toFixed(1)}°C</p>
    else
      return <></>
  }

  // So it does not display info if there's no model info
  const PlaneModelInfo = () => {

    let plane_age = new Date().getFullYear() - flight.year_manufactured

    if (flight.plane_model === undefined || flight.plane_model == "")
      return (<></>)
    else
      return (
        <>
          {flight.manufacturer} {flight.plane_model} ({plane_age <= 60 && plane_age + " years old"})
        </>
      )
  }

  return (
    <div className="flex-1 space-y-5">
      {/* Header with flight number and airline */}
      <div className="flex items-start justify-between gap-8 bg-gray-300 p-3 rounded-md">
        <div className="space-y-2">
          <div className="flex items-baseline gap-8">
            <h2 className="text-6xl font-bold">{flight.airline_network}{flight.flight_number_airline}</h2>

          </div>
          <p className="text-xl italic">
            <PlaneModelInfo />
          </p>
          <p className="text-xl">
            Previous flight was {" "}
            <span className={flight.prev_f_delay > 0 ? "text-red-500 font-bold" : "text-green-500 font-bold"}>
              {flight.prev_f_delay > 0 ? "LATE" : "ON TIME"}
            </span>
          </p>
        </div>
      </div>

      {/* Flight route and prediction */}
      <div className="grid grid-cols-[1fr,1fr,auto] gap-5 ">
        {/* Arrival & Depature */}
        <div className="flex gap-7">
          {/* Departs from */}
          <div className="space-y-1 bg-gray-300 p-3 rounded-md flex-1 ">
            <h4 className="font-bold text-xl mb-3 italic">Depature</h4>
            <p className="text-lg">
               {flight.origin_city_name} ({flight.origin})
            </p>
            <p className="text-lg">{formatDate(flight.scheduled_departure_datetime)}</p>
            <Temp origin_dest="origin"/>
          </div>

          {/* Arrives to */}
          <div className="space-y-1 bg-gray-300 p-3 rounded-md flex-1">
            <h4 className="font-bold text-xl mb-3 italic">Arrival</h4>
            <p className="text-lg">
              {flight.dest_city_name} ({flight.destination})
            </p>
            <p className="text-lg">{formatDate(flight.schedules_arrival_datetime)}</p>
            <Temp origin_dest="dest"/>
          </div>
        </div>

        {/* Prediction */}
        <div className="space-y-1 bg-gray-300 p-3 rounded-md">
          <h4 className="font-bold text-xl mb-3 italic">Prediction</h4>
          <PredictionBadge prediction={flight.prediction || "UNKNOWN"} />
        </div>
      </div>

      {/* Statistics */}
      <div className="space-y-1 bg-gray-300 p-3 rounded-md">
        <h4 className="font-bold text-xl mb-2 italic">Statistics</h4>
        <p className="text-lg">
          Estimated Duration: {flight.crs_elapsed_time < 60 || Math.floor(flight.crs_elapsed_time / 60).toString() + "h"}
          {flight.crs_elapsed_time % 60 == 0 || Math.round(flight.crs_elapsed_time % 60).toString() + "m"}
        </p>
        <p className="text-lg">
          Distance: {flight.distance.toLocaleString()}km
        </p>
        <p className="text-lg">Percentage Late: {(flight.historical_lateness * 100).toFixed(1) }%</p>
      </div>

      {/* Flight Aware Link */}
      <div className="text-sm">
        <span className="font-bold italic">Flightrader24 </span>
        <a
          href={`https://www.flightradar24.com/data/flights/${flight.airline_network}${flight.flight_number_airline}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          https://www.flightradar24.com/data/flights/{flight.airline_network}{flight.flight_number_airline}
        </a>
      </div>
    </div>
  )
}
