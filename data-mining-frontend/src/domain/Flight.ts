export interface Flight {
  year: number
  month: number
  day_of_week: number
  day_of_month: number
  flight_date: string

  flight_seq: number
  is_peak_hours: boolean
  origin_hourly_volume: number
  day_sin: number
  day_cos: number
  origin_lat: number
  origin_lon: number
  dest_lat: number
  dest_lon: number
  distance: number

  crs_dep_time: string
  dep_time: string
  dep_delay: number
  crs_arr_time: string
  arr_time: string
  arr_delay: number
  crs_elapsed_time: number

  origin: string
  origin_city_name: string
  destination: string
  dest_city_name: string
  scheduled_departure_datetime: string
  schedules_arrival_datetime: string

  prev_f_delay: number
  airline_network: string
  flight_number_airline: string
  tail_number: string
  year_manufactured: number
  manufacturer: string
  plane_model: string

  origin_date: string
  origin_station: string
  origin_precip: number
  origin_sky_clearness: number
  origin_dew_point: number
  origin_temp: number
  origin_atmo_pressure: number
  origin_visibility: number
  origin_wind_direction: number
  origin_wind_code: string
  origin_wind_speed: number

  dest_date: string
  dest_station: string
  dest_precip: number
  dest_sky_clearness: number
  dest_dew_point: number
  dest_temp: number
  dest_atmo_pressure: number
  dest_visibility: number
  dest_wind_direction: number
  dest_wind_code: string
  dest_wind_speed: number

  prediction?: string
}
