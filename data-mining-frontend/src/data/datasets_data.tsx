export const Datasets_Data = [
  {
      type:"Source",
      tabName: "Flights",
      fullName: "Bureau of Transportation Statistics Flight Delays",
      source: "https://transtats.bts.gov/PREZIP/",
      description:
        "Has flight delays information for all domestic U.S. flights from airlines who hold at least 0.5% domestic market share.",
      rows_info:"7,546,968 flight records before cleaning, 7,425,229 after cleaning",
      columns_info: "120 columns in the original dataset, of which 23 are used",
      columns:[
        {name:"Year", desc:"-", example:"2025"},
        {name:"Quarter", desc:"-", example:"1"},
        {name:"Month", desc:"-", example:"1"},
        {name:"DayofMonth", desc:"-", example:"14"},
        {name:"DayOfWeek", desc:"-", example:"7"},
        {name:"FlightDate", desc:"-", example:"2024-01-14"},
        {name:"Marketing_Airline_Network", desc:"Left part of the flight number in IATA format", example:"UA"},
        {name:"Flight_Number_Marketing_Airline", desc:"Right part of the flight number", example:"4430"},
        {name:"Tail_Number", desc:"Identifier for the aircraft", example:"N535GJ"},
        {name:"Origin", desc:"Origin IATA airport code", example:"IAD"},
        {name:"OriginCityName", desc:"-", example:"Washington, DC"},
        {name:"OriginState", desc:"-", example:"VA"},
        {name:"Dest", desc:"Destination IATA airport code", example:"EWR"},
        {name:"DestCityName", desc:"-", example:"Newark, NJ"},
        {name:"DestState", desc:"-", example:"NJ"},
        {name:"CRSDepTime", desc:"Scheduled local departure time formatted as an integer (e.g. 6:50pm -> 1850)", example:"815"},
        {name:"DepTime", desc:"Actual local departure time", example:"814"},
        {name:"DepDelay", desc:"Departure delay in minutes", example:"-1"},
        {name:"CRSArrTime", desc:"Scheduled local arrival time", example:"934"},
        {name:"ArrTime", desc:"Actual local arrival time", example:"1000"},
        {name:"ArrDelay", desc:"Arrival delay in minutes", example:"26"},
        {name:"CRSElapsedTime", desc:"Time in air (useful due to timezones)", example:"79"},
        {name:"Distance", desc:"Distance in kilometres", example:"212"},
      ]
      , custom:"https://www.flightaware.com/live/flight/UAL4430"

    },
    {
      type:"Source",
      tabName: "Airports",
      fullName: "Open Airports Database",
      source: "https://github.com/open-aviation-data/airports",
      description:
        "Has a list of airports including the IATA and ICAO codes which are needed to join Flights and Weather datasets",
      rows_info:"71,219 total airports, 21,706 located in the U.S, of which 359 exist in the flights dataset",
      columns_info: "20 columns in the original dataset, of which 6 are used",
      columns:[
        {name:"ident", desc:"Unique identifier", example:"KIAD"}
        , {name:"name", desc:"Airport name", example:"Washington Dulles International Airport"}
        , {name:"iata", desc:"Flights dataset airport code (IATA)", example:"IAD"}
        , {name:"gps_code", desc:"Weather station dataset airport code (ICAO)", example:"KIAD"}
        , {name:"lat", desc:"-", example:"38.9445"}
        , {name:"long", desc:"-", example:"-77.455803"}
      ]
    },

    {
      type:"Source",
      tabName: "Stations",
      fullName: "NCEI Weather Stations for Global Hourly",
      source: "https://www.ncei.noaa.gov/pub/data/noaa/isd-history.txt",
      description: "Text file containing weather stations with airport codes.",
      rows_info:"29,659 total weather stations, of which 360 join to the flights dataset (with CNY, VEL, and XWA missing a weather station) ",
      columns_info: "11 columns in the original dataset, of which 5 are used",
      columns:[
        {name:"STATION_NAME", desc:"-", example:"WASHINGTON DULLES INTERNATION"}
        , {name:"USAF", desc:"Air Force station ID", example:"724030"}
        , {name:"WBAN", desc:"Weather station ID", example:"93738"}
        , {name:"STATION_ID", desc:"Concatination of USAF and WBAN to join weather API dataset", example:"72403093738"}
        , {name:"CALL", desc:"Airport ID in ICAO format", example:"KIAD"}
      ]
    },
    {
      type:"Source",
      tabName: "Weather",
      fullName: "NCEI Weather Global Hourly",
      source:
        "https://www.ncei.noaa.gov/access/services/data/v1?dataset=global-hourly",
      description:
        "Weather data API that can be used to request hourly weather data for every airport in the flights dataset. Can join on the nearest weather report to the schedule departure time. (Potentially also for arrivals).",
      rows_info:"4,712,625 weather reports for the 360 weather stations (on average 36 weather reports per day per station)",
      columns_info: "9 columns are queried through the API",
      columns:[
        {name:"STATION", desc:"Weather station ID", example:"72403093738"}
        , {name:"DATE", desc:"-", example:"2024-01-14T07:52:00"}
        , {name:"AA1", desc:"Precipitation (Time grain in hours, precipitation in mm, condition code, quality code)", example:"01,0000,9,5"}
        , {name:"CIG", desc:"Sky Condition (Lowest cloud height in metres, quality code, measuring method, CAVOK code) ", example:"22000,5,9,N"}
        , {name:"DEW", desc:"Dew Point (Dew point in celcius * 10, quality code)", example:"-0072,5"}
        , {name:"SLP", desc:"Sea level pressure (Air pressure in hectopascals * 10, quality code)", example:"10131,5"}
        , {name:"TMP", desc:"Temperature (Temp in celcius * 10, quality code)", example:"-0022,5"}
        , {name:"VIS", desc:"Visibility (Visibility in metres, quality code, variation code, quality variation code)", example:"016093,5,N,5"}
        , {name:"WND", desc:"Wind (Wind direciton as an angle, direction qualrty code, type coee, wind speed in m/s * 10, speed qualiy code)", example:"190,5,N,0026,5"}
      ]
    },
    {
      type:"Source",
      tabName: "Aircraft",
      fullName: "Federal Aviation Administration Aircraft Registry",
      source:
        "https://www.faa.gov/licenses_certificates/aircraft_certification/aircraft_registry/releasable_aircraft_download",
      description: "Aircraft registry that contains model and age information for aircraft in the U.S.",
      rows_info:"529,141 total aircraft, 6,271 / 6,433 aircraft from the flights dataset have a record in the registry",
      columns_info: "36 columns in the original dataset, of which 4 are used",
      columns:[
        {name:"Tail_Number", desc:"Aircraft identifier", example:"N535GJ"}
        , {name:"YEAR-MFR", desc:"Year Manufactured", example:"2005"}
        , {name:"MFR", desc:"Manufacturer", example:"BOMBARDIER INC"}
        , {name:"MODEL", desc:"Aircraft model", example:"CL-600-2C11"}
      ]
    },
    {
      type:"Final",
      tabName: "Final",
      fullName: "U.S Domestic Flight On Time Analysis Combined Dataset",
      source:
        "https://drive.google.com/drive/folders/1r3XVACeMHha03y5eqIoJ22kwojUfWweO?usp=drive_link",
      description: "A combination of the datasets specified in the previous tabs.",
      rows_info:"7,425,229 flight records",
      columns_info: "52 columns",
      columns:[
        { name: "YEAR", desc: "-", example: 2024, missing_count: 0, source: "Flights" },
        { name: "MONTH", desc: "-", example: 1, missing_count: 0, source: "Flights" },
        { name: "DAYOFMONTH", desc: "-", example: 14, missing_count: 0, source: "Flights" },
        { name: "DAYOFWEEK", desc: "-", example: 7, missing_count: 0, source: "Flights" },
        {
          name: "FLIGHTDATE",
          desc: "-",
          example: "2024-01-14",
          missing_count: 0,
          source: "Flights",
        },
        {
          name: "MARKETING_AIRLINE_NETWORK",
          desc: "Left part of the flight number in IATA format",
          example: "UA",
          missing_count: 0,
          source: "Flights",
        },
        {
          name: "FLIGHT_NUMBER_MARKETING_AIRLINE",
          desc: "Right part of the flight number",
          example: 4430,
          missing_count: 1,
          source: "Flights",
        },
        {
          name: "TAIL_NUMBER",
          desc: "Identifier for the aircraft",
          example: "N535GJ",
          missing_count: 0,
          source: "Flights, Aircraft",
        },
        { name: "ORIGIN", desc: "Origin IATA airport code", example: "IAD", missing_count: 0, source: "Flights, Airports" },
        {
          name: "ORIGINCITYNAME",
          desc: "-",
          example: "Washington, DC",
          missing_count: 0,
          source: "Flights",
        },
        { name: "DEST", desc: "Destination IATA airport code", example: "EWR", missing_count: 0, source: "Flights, Airports" },
        {
          name: "DESTCITYNAME",
          desc: "-",
          example: "Newark, NJ",
          missing_count: 0,
          source: "Flights",
        },
        { name: "CRSDEPTIME", desc: "Scheduled local departure time formatted as an integer (e.g. 6:50pm -> 1850)", example: 815, missing_count: 0, source: "Flights" },
        { name: "DEPTIME", desc: "Actual local departure time", example: 814, missing_count: 0, source: "Flights" },
        { name: "DEPDELAY", desc: "Departure delay in minutes", example: -1, missing_count: 0, source: "Flights" },
        { name: "CRSARRTIME", desc: "Scheduled local arrival time", example: 934, missing_count: 0, source: "Flights" },
        { name: "ARRTIME", desc: "Actual local arrival time", example: 1000, missing_count: 0, source: "Flights" },
        { name: "ARRDELAY", desc: "Arrival delay in minutes", example: 26, missing_count: 0, source: "Flights" },
        {
          name: "CRSELAPSEDTIME",
          desc: "Time in air (useful due to timezones)",
          example: 79,
          missing_count: 0,
          source: "Flights",
        },
        { name: "DISTANCE", desc: "Distance in kilometres", example: 212, missing_count: 0, source: "Flights" },
        {
          name: "SCHEDULEDDEPARTUREDATETIME",
          desc: "Scheduled depature time formated as datetime",
          example: "2024-01-14 08:15:00",
          missing_count: 0,
          source: "Flights",
        },
        {
          name: "SCHEDULEDARRIVALDATETIME",
          desc: "Scheduled arrival time formated as datetime",
          example: "2024-01-14 09:34:00",
          missing_count: 0,
          source: "Flights",
        },
        {
          name: "ORIGIN_LAT",
          desc: "Origin airport latitude",
          example: 38.9445,
          missing_count: 0,
          source: "Airports",
        },
        {
          name: "ORIGIN_LON",
          desc: "Origin airport longitude",
          example: -77.455803,
          missing_count: 0,
          source: "Airports",
        },
        {
          name: "DEST_LAT",
          desc: "Destination airport latitude",
          example: 40.692501,
          missing_count: 0,
          source: "Airports",
        },
        {
          name: "DEST_LON",
          desc: "Destination airport longitude",
          example: -74.168701,
          missing_count: 0,
          source: "Airports",
        },
        {
          name: "YEAR_MANUFACTURED",
          desc: "-",
          example: 2005,
          missing_count: 307888,
          source: "Aircraft",
        },
        {
          name: "MANUFACTURER",
          desc: "-",
          example: "BOMBARDIER INC",
          missing_count: 126012,
          source: "Aircraft",
        },
        {
          name: "PLANE_MODEL",
          desc: "-",
          example: "CL-600-2C11",
          missing_count: 126012,
          source: "Aircraft",
        },
        {
          name: "ORIGIN_DATE",
          desc: "Origin weather reading time rounded to the hour",
          example: "2024-01-14 08:00:00",
          missing_count: 2018,
          source: "Weather",
        },
        {
          name: "ORIGIN_STATION",
          desc: "Origin weather station",
          example: 72403093738,
          missing_count: 2018,
          source: "Weather, Stations",
        },
        {
          name: "ORIGIN_PRECIP",
          desc: "Precipitation in mm",
          example: 0.0,
          missing_count: 429039,
          source: "Weather",
        },
        {
          name: "ORIGIN_SKY_CLEARNESS",
          desc: "Lowest cloud height in metres",
          example: 22000,
          missing_count: 20165,
          source: "Weather",
        },
        {
          name: "ORIGIN_DEW_POINT",
          desc: "Dew point in celcius",
          example: -7.2,
          missing_count: 25235,
          source: "Weather",
        },
        {
          name: "ORIGIN_TEMP",
          desc: "Temperature in celcius",
          example: -2.2,
          missing_count: 23837,
          source: "Weather",
        },
        {
          name: "ORIGIN_ATMO_PRESSURE_SEALVL",
          desc: "Sea level pressure (Air pressure in hectopascals)",
          example: 10131,
          missing_count: 75243,
          source: "Weather",
        },
        {
          name: "ORIGIN_VISIBILITY",
          desc: "Visibility in metres",
          example: 16093,
          missing_count: 18740,
          source: "Weather",
        },
        {
          name: "ORIGIN_WIND_DIRECTION",
          desc: "Wind direction as an angle",
          example: 190,
          missing_count: 1186927,
          source: "Weather",
        },
        {
          name: "ORIGIN_WIND_CODE",
          desc: "Wind code",
          example: "N",
          missing_count: 18602,
          source: "Weather",
        },
        {
          name: "ORIGIN_WIND_SPEED",
          desc: "Wind speed in m/s * 10",
          example: 26,
          missing_count: 18602,
          source: "Weather",
        },
        {
          name: "DEST_DATE",
          desc: "Destination weather reading time rounded to the hour",
          example: "2024-01-14 10:00:00",
          missing_count: 2433,
          source: "Weather",
        },
        {
          name: "DEST_STATION",
          desc: "Destination weather station",
          example: 72502014734,
          missing_count: 2433,
          source: "Weather, Stations",
        },
        {
          name: "DEST_PRECIP",
          desc: "Precipitation in mm",
          example: 0.0,
          missing_count: 429854,
          source: "Weather",
        },
        {
          name: "DEST_SKY_CLEARNESS",
          desc: "Lowest cloud height in metres",
          example: 22000,
          missing_count: 17147,
          source: "Weather",
        },
        {
          name: "DEST_DEW_POINT",
          desc: "Dew point in celcius",
          example: -6.7,
          missing_count: 23984,
          source: "Weather",
        },
        {
          name: "DEST_TEMP",
          desc: "Temperature in celcius",
          example: 0.0,
          missing_count: 22875,
          source: "Weather",
        },
        {
          name: "DEST_ATMO_PRESSURE_SEALVL",
          desc: "Sea level pressure (Air pressure in hectopascals)",
          example: 10106,
          missing_count: 74769,
          source: "Weather",
        },
        {
          name: "DEST_VISIBILITY",
          desc: "Visibility in metres",
          example: 16093,
          missing_count: 16597,
          source: "Weather",
        },
        {
          name: "DEST_WIND_DIRECTION",
          desc: "Wind direction as an angle",
          example: 220,
          missing_count: 1102031,
          source: "Weather",
        },
        {
          name: "DEST_WIND_CODE",
          desc: "Wind code",
          example: "N",
          missing_count: 16769,
          source: "Weather",
        },
        {
          name: "DEST_WIND_SPEED",
          desc: "Wind speed in m/s * 10",
          example: 41,
          missing_count: 16769,
          source: "Weather",
        },
        {
          name: "DAY_SIN",
          desc: "Cyclical encoding of Day of the Week",
          example: "2.449294e-16",
          missing_count: 0,
          source: "Flights, Feature Engineered",
        },
        {
          name: "DAY_COS",
          desc: "Cyclical encoding of Day of the Week",
          example: "-0.900969",
          missing_count: 0,
          source: "Flights, Feature Engineered",
        },
        {
          name: "FLIGHT_SEQ",
          desc: "Count of previous flights that day",
          example: 3,
          missing_count: 0,
          source: "Flights, Feature Engineered",
        },
        {
          name: "PREV_F_DELAY",
          desc: "Was the plane's previous flight delayed",
          example: 1,
          missing_count: 0,
          source: "Flights, Aircraft, Feature Engineered",
        },
        {
          name: "HISTORICAL_LATENESS",
          desc: "Window function of % of previous delays on a route",
          example: 0.12,
          missing_count: 0,
          source: "Flights, Feature Engineered",
        },
        { name: "IS_LATE", desc: "Aircraft arrives more than 15 minutes late?", example: 1, missing_count: 0, source: "Flights" },
      ]
    },
];
