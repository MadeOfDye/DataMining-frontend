import usaMapData from "us-atlas/states-10m.json";
import * as topojson from "topojson-client";
import { geoPath, geoAlbersUsa, type GeoPermissibleObjects } from "d3-geo";
import airport_data from "../../../data/airports.json";
import flights_data from "../../../data/flights.json";
import { Tooltip } from "react-tooltip";
import { useState } from "react";

export function Map() {

  const [selectedAirport, setSelectedAirport] = useState<any | null>(null)

  const [selectedFilter, setSelectedFilter] = useState<any | null>("airport");

  const [toggle10, setToggle10] = useState<any | null>(false);

  const states = (topojson.feature(
    usaMapData as any,
    usaMapData.objects.states as any
  ) as any).features;


  const map_projection = geoAlbersUsa();
  const pathGenerator = geoPath().projection(map_projection);

 
  const filtered_airports = airport_data.filter((d) => {
      return map_projection([d.lon, d.lat]);
    })
    .filter((d) => {
      return map_projection([d.lon, d.lat]);
    });

    const filtered_flights = flights_data.filter((d) => {
      return map_projection([d.origin_lon, d.origin_lat]);
    })
    .filter((d) => {
      return map_projection([d.dest_lon, d.dest_lat]);
    }).sort((a,b) => {
      if (selectedFilter == "airport") {
        return (a.dest > b.dest ? 1 : (b.dest < a.dest ? -1 : 0))
      } else if (selectedFilter == "count"){
        return b.count - a.count
      } else if (selectedFilter == "late") {
        return b.late_pct - a.late_pct
      } else {
        return 0
      }
  })

    const current_airports = filtered_flights.filter((row)=>row.origin == selectedAirport?.airport_code).filter((_, i)=> toggle10 ? i < 10 : true);

    const current_destination_count = filtered_flights.filter((row)=>row.origin == selectedAirport?.airport_code).length


    const colourByLateness = (late_pct: any) => {
        if (late_pct < 15) return "rgba(0, 156, 13, 0.4)"
        if (late_pct < 25) return "rgba(201, 209, 40,  0.4)"
        if (late_pct < 35) return "rgba(189, 134, 32,  0.4)"
        return "rgba(189, 32, 32, 0.4)"
    }

    const widthByCount = (count: any) => {
        return Math.log10(count);
    }

  return (
    <div className="pl-10 pb-5">
      <h2 className="text-2xl font-bold text-center py-3 pb-5 " >Map Explorer</h2>
      <div className="flex gap-4">
        <div className="bg-gray-600 flex-1 rounded-md  ">
          <div className="p-3 ">
            { selectedAirport != null ? (
              <>
              <span className="text-gray-200">
                <h2 className="font-bold text-xl text-center mb-2">{selectedAirport?.airport_name} </h2> 
                <h3 className="text-lg">Code: {selectedAirport?.airport_code}</h3>
                <h3 className="text-lg">
                  No. of Destinations: { current_destination_count.toLocaleString() }
                </h3>
                <h3 className="text-lg ">
                  Late Flights: { selectedAirport.late_pct }%
                </h3>
              </span>
              <label className="text-lg text-gray-200"> Sort by </label>
              <select id="filters" className="bg-white ml-1" onChange={(event)=>setSelectedFilter(event.target.value)}>
                  <option value="airport">Code</option>
                  <option value="count">Count</option>
                  <option value="late">Late %</option>
              </select>
              
              <button 
                className="font-semibold rounded-sm bg-blue-300 w-full cursor-pointer hover:bg-blue-400 mr-5 my-2" 
                onClick={()=>setToggle10(!toggle10)}
              > { toggle10 ?  "Show All" :  "Show Top 10" } </button>
              
              <div className="overflow-y-auto bg-yellow h-137">
                <table className="table-fixed w-full ">
                  <thead className="sticky top-0">
                    <tr className="bg-gray-400">
                      <th className="p-0.5">Airport Code</th>
                      <th className="p-0.5">Total Flights</th>
                      <th className="p-0.5">Late %</th>
                    </tr>
                  </thead>
                  <tbody>
                  {current_airports.map((row: any)=>{
                    
                    return  (<tr className="odd:bg-white even:bg-gray-200" key={row.origin + row.dest}>
                      <td className="p-0.5 p-2 border-r-2 border-gray-400">
                        <button 
                          className="font-semibold rounded-sm bg-blue-200 w-full cursor-pointer hover:bg-blue-300" 
                          onClick={()=>{setSelectedAirport(filtered_airports.filter((i)=>i.airport_code == row.dest)[0])}}
                        >
                          {row.dest}
                        </button>
                      </td>
                      <td className="p-0.5 pl-3 border-r-2 border-gray-400 text-right pr-3">{row.count.toLocaleString()}</td>
                      <td className="p-0.5 pl-3 text-right pr-3">{ row.late_pct }%</td>
                    </tr>)
                  })}
                  </tbody>
                </table>
              </div>
                
              </>
            ) : <span className="font-bold text-gray-200">Please click on an airport in the map</span>}
          </div>
        </div>
        <svg viewBox="0 0 975 610" className="bg-gray-600 flex-4 h-200 rounded-md">
          <g fill="lightgrey" stroke="white" strokeWidth="1">
            {states.map((state: GeoPermissibleObjects) => (
              <path d={pathGenerator(state) as any} key={(state as any).id} />
            ))}
          </g>
          <g>
            {
              current_airports.reverse().map((line)=>{

                let [x1, y1] = map_projection([line.origin_lon, line.origin_lat]) ?? [0,0];
                let [x2, y2] = map_projection([line.dest_lon, line.dest_lat]) ?? [0,0];

                return (<line 
                  className="flight-tooltip"
                  data-tooltip-html={line.origin + " -> " + line.dest + " <br/> Flights: " + line.count.toLocaleString() + " <br/> Late: " + line.late_pct + "%"}
                  key={line.origin + line.dest}
                  
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  strokeWidth={widthByCount(line.count)}
                  stroke={colourByLateness(line.late_pct)}
                />)
              })
            }
            {filtered_airports.map((point) => {

              let [cx, cy] = map_projection([point.lon, point.lat]) ?? [0,0];

              return (
                  <circle
                    className="airport-point cursor-pointer"
                    cx={cx}
                    cy={cy}
                    data-tooltip-content={point.airport_name}
                    onClick={()=>{setSelectedAirport(point)}}
                    r={point == selectedAirport ? "2.5" : "2"}
                    fill={point == selectedAirport ? "blue" : "red"}
                    key={point.airport_name}

                  />
              );
            })}

          </g>
        </svg>
        
        <Tooltip anchorSelect=".airport-point" place="top" />
        <Tooltip anchorSelect=".flight-tooltip" float={true} />
        <br></br>
        <br></br>
      </div>
    </div>
  );
}
