import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

export function Datasets() {
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

  const smallertitle = {
    fontSize:"20px",
    fontWeight:"bold",
    margin:"20px 0 15px"
  }

  const paragraphBreak = {
    marginBottom:"15px"
  }

  const datasetInfo = [
    {
      tabName: "Flights",
      fullName: "Bureau of Transportation Statistics Flight Delays",
      source: "https://transtats.bts.gov/PREZIP/",
      description:
        "Has flight delays information for all domestic U.S. flights from airlines who hold at least 0.5% domestic market share.",
    },
    {
      tabName: "Airports",
      fullName: "Open Airports Database",
      source: "https://github.com/open-aviation-data/airports",
      description:
        "Has a list of airports including the IATA and ICAO codes which are needed to join Flights and Weather datasets",
    },
    {
      tabName: "Stations",
      fullName: "NCEI Weather Stations for Global Hourly",
      source: "https://www.ncei.noaa.gov/pub/data/noaa/isd-history.txt",
      description: "Text file containing weather stations with airport codes.",
    },
    {
      tabName: "Weather",
      fullName: "NCEI Weather Global Hourly",
      source:
        "https://www.ncei.noaa.gov/access/services/data/v1?dataset=global-hourly",
      description:
        "Weather data API that can be used to request hourly weather data for every airport in the flights dataset. Can join on the nearest weather report to the schedule departure time. (Potentially also for arrivals).",
    },
    {
      tabName: "Aircraft",
      fullName: "Federal Aviation Administration Aircraft Registry",
      source:
        "https://www.faa.gov/licenses_certificates/aircraft_certification/aircraft_registry/releasable_aircraft_download",

      description: "Can get the model from the tail number.",
    },
  ];

  return (
    <div style={container}>
      <h2 style={smalltitle}>Our Datasets</h2>
      <Tabs>
        <TabList>
          {datasetInfo.map((item) => (
            <Tab>{item.tabName}</Tab>
          ))}
        </TabList>

        {datasetInfo.map((item) => (
          <TabPanel>
            
            <h3 style={smallertitle}>{item.fullName}</h3>
            <p style={paragraphBreak}>{item.description}</p>
            <i>
              <a href={item.source}>Click here to view source</a>
            </i>
          </TabPanel>
        ))}
      </Tabs>
      <br></br>
      <br></br>
    </div>
  );
}
