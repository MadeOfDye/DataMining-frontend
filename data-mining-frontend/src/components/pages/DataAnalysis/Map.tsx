import usaMapData from "us-atlas/states-10m.json";
import * as topojson from "topojson-client";
import { geoPath, geoAlbersUsa, type GeoPermissibleObjects } from "d3-geo";
import data from "../../../data/airport_info.json";
import { Tooltip } from "react-tooltip";

export function Map() {
  const container = {
    borderStyle: "solid",
    borderWidth: "0px 0px 1px 0px",
    borderBottom: "2px solid black",
    fontFamily: "Inter",
    paddingLeft: "50px",
  };

  const smalltitle = {
    textAlign: "center" as "center",
    fontSize:"24px",
    fontWeight:"bold",
    marginTop:"10px"
  };

  const states = (topojson.feature(
    usaMapData as any,
    usaMapData.objects.states as any
  ) as any).features;

  const map_projection = geoAlbersUsa();
  const pathGenerator = geoPath().projection(map_projection);

  const filtered_data = data.data
    .filter((d) => {
      return map_projection([d.origin_lon, d.origin_lat]);
    })
    .filter((d) => {
      return map_projection([d.dest_lon, d.dest_lat]);
    });

  const airports_data = filtered_data
    .filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.Origin === item.Origin)
    )
    .map((d) => {
      return { airport: d.Origin, lon: d.origin_lon, lat: d.origin_lat };
    });

  return (
    <div style={container}>
      <h2 style={smalltitle}>Map Explorer</h2>
      <svg viewBox="0 0 975 610">
        <g fill="lightgrey" stroke="white" strokeWidth="1">
          {states.map((state: GeoPermissibleObjects) => (
            <path d={pathGenerator(state) as any} />
          ))}
        </g>
        <g>
          {airports_data.map((point) => {
            return (
              <>
                <circle
                  className="airport-point"
                  cx={map_projection([point.lon, point.lat])?.[0]}
                  cy={map_projection([point.lon, point.lat])?.[1]}
                  data-tooltip-content={point.airport}
                  r="2"
                  fill="red"
                />
              </>
            );
          })}
        </g>
      </svg>
      <Tooltip anchorSelect=".airport-point" place="top" />
      <br></br>
      <br></br>
    </div>
  );
}
