import { config } from "./config";

export const environment = {
    weatherMapAPI:{
        baseApiUrl: 'https://api.openweathermap.org',
        version: '2.5',
        apiKey: config.weatherMapApiKey
    }
};