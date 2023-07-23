import { Coords } from "../client/location";

// Long but gold.. it will help us have a contract between Client & API

interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

interface MainWeather {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
}
export interface CurrentWeatherResponse {
    dt: number;
    coord: Coords;
    weather: Array<Weather>;
    base: string;
    main: MainWeather;
    visibility: number;
    wind: {
        speed: number;
        deg: number;
        gust?: number;
    };
    rain?: {
        '3h': number;
    },
    snow?: {
        '3h': number;
    },
    clouds: {
        all: number;
    };
    sys: {
        type: number;
        id: number;
        country: string;
        sunrise: number;
        sunset: number;
    };
    timezone: number;
    id: number;
    name: string;
    cod: number;
}


export interface ForecastResponse {
    cod: string;
    message: number;
    cnt: number;
    list: Array<{
        dt: number;
        main: MainWeather;
        weather: Array<Weather>;
        clouds: {
            all: number;
        };
        wind: {
            speed: number;
            deg: number;
            gust?: number;
        };
        visibility: number;
        pop: number;
        rain?: {
            '3h': number;
        };
        snow?: {
            '3h': number;
        }
        sys: {
            pod: string;
        };
        dt_txt: string;
    }>;
    city: {
        id: number;
        name: string;
        coord: Coords;
        country: string;
        population: number;
        timezone: number;
        sunrise: number;
        sunset: number;
    };
}