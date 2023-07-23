import { Coords } from "../models/client/location";
import { LocationService } from "../services/location/location.service";
import { WeatherService } from "../services/weather/weather.service";


export function currentWeatherInitializer(locationService: LocationService, weatherService: WeatherService) {
  return async () => {
    const coords: Coords = await locationService.getLocation();

    return weatherService.getCurrentWeather(coords.lat, coords.lon).subscribe();
  };
}