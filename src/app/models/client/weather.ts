import { CurrentWeatherResponse, ForecastResponse } from "../api/weather";

export interface IWeather {
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
    },
    rain?: {
        '3h': number,
    },
    snow?: {
        '3h': number,
    },
    date: Date;
}

export interface IWeatherLocation {
    city: string,
    country: string,
    sunrise: Date,
    sunset: Date,
}

export interface ICurrentWeather extends IWeather, IWeatherLocation { }

export interface IForecastWeather extends IWeatherLocation {
    days: Array<IWeather>,
}

export class CurrentWeather implements IWeather {
    city: string;
    country: string;
    sunrise: Date;
    sunset: Date;
    date: Date;
    weather: { main: string; description: string; icon: string; feelsLike: number; humidity: number; temp: number; tempMax: number; tempMin: number };
    wind: { deg: number; speed: number };
    rain: { '3h': number; } | undefined;
    snow: { '3h': number; } | undefined;

    constructor(data: CurrentWeatherResponse) {
        if (!data.weather[0]) {
            throw new Error("Weather array object does not exist");
        }
        if (!data.main) {
            throw new Error("Weather main object does not exist");
        }

        // Map api data to client object
        this.city = data.name;
        this.country = data.sys.country;
        this.sunrise = new Date(data.sys.sunrise * 1000);
        this.sunset = new Date(data.sys.sunset * 1000);
        this.date = new Date(data.dt * 1000);
        this.weather = {
            main: data.weather[0].main,
            description: data.weather[0].description,
            icon: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
            feelsLike: data.main.feels_like,
            humidity: data.main.humidity,
            temp: data.main.temp,
            tempMax: data.main.temp_max,
            tempMin: data.main.temp_min
        };
        this.wind = { ...data.wind };
        if (data.rain) {
            this.rain = { ...data.rain };
        }
        if (data.snow) {
            this.snow = { ...data.snow };
        }
    }
}
export class ForecastWeather implements IForecastWeather {
    days: IWeather[];
    city: string;
    country: string;
    sunrise: Date;
    sunset: Date;

    constructor(data: ForecastResponse) {
        this.city = data.city.name;
        this.country = data.city.country;
        this.sunrise = new Date(data.city.sunrise * 1000);
        this.sunset = new Date(data.city.sunset * 1000);
        this.days = data.list.map(day => {
            if (!day.weather[0]) {
                throw new Error("[Forecast day item] Weather array object does not exist");
            }
            if (!day.main) {
                throw new Error("[Forecast day item] Weather main object does not exist");
            }
            return {
                date: new Date(day.dt * 1000),
                weather: {
                    main: day.weather[0].main,
                    description: day.weather[0].description,
                    icon: `http://openweathermap.org/img/w/${day.weather[0].icon}.png`,
                    feelsLike: day.main.feels_like,
                    humidity: day.main.humidity,
                    temp: day.main.temp,
                    tempMax: day.main.temp_max,
                    tempMin: day.main.temp_min
                },
                wind: { ...day.wind },
                rain: day.rain && {...day.rain},
                snow: day.snow && {...day.snow}
            }
        })
    }
}