import { CurrentWeatherResponse } from "../api/weather"

export interface ICurrentWeather {
    name: string,
    sys: {
        country: string,
        sunrise: Date,
        sunset: Date,
    }
    date: Date,
    weather: {
        main: string,
        description: string,
        icon: string,
        feelsLike: number,
        humidity: number,
        temp: number,
        tempMax: number,
        tempMin: number
    },
    wind: {
        deg: number,
        speed: number
    }
}
export class CurrentWeather implements ICurrentWeather {
    name: string;
    sys: { country: string; sunrise: Date; sunset: Date };
    date: Date;
    weather: { main: string; description: string; icon: string; feelsLike: number; humidity: number; temp: number; tempMax: number; tempMin: number };
    wind: { deg: number; speed: number };

    constructor(data: CurrentWeatherResponse) {
        if (!data.weather[0]) {
            throw new Error("Weather array object does not exist");
        }
        if (!data.main) {
            throw new Error("Weather main object does not exist");
        }

        // Map api data to client object
        this.name = data.name;
        this.sys = {
            country: data.sys.country,
            sunrise: new Date(data.sys.sunrise * 1000),
            sunset: new Date(data.sys.sunset * 1000)
        };
        this.date = new Date(data.dt * 1000);
        this.weather = {
            main: data.weather[0].main,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
            feelsLike: data.main.feels_like,
            humidity: data.main.humidity,
            temp: data.main.temp,
            tempMax: data.main.temp_max,
            tempMin: data.main.temp_min
        };
        this.wind = { ...data.wind };

    }
}