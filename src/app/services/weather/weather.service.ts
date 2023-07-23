import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of, tap } from 'rxjs';
import { environment } from 'src/environment/environment';
import { CurrentWeather } from 'src/app/models/client/weather';
import { CurrentWeatherResponse } from 'src/app/models/api/weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private API_URL: string = `${environment.weatherMapAPI.baseApiUrl}/data/${environment.weatherMapAPI.version}`;
  private currentWeatherData!: CurrentWeather;

  constructor(private http: HttpClient) { }

  getCurrentWeather(lat: number, lon: number): Observable<CurrentWeather> {
    // If current weather data is already present, return it
    if (this.currentWeatherData) {
      return of(this.currentWeatherData);
    }

    return this.http.get(`${this.API_URL}/weather?lat=${lat}&lon=${lon}&appid=${environment.weatherMapAPI.apiKey}`).pipe(
      map((data) => new CurrentWeather(data as CurrentWeatherResponse)),
      tap((currentWeatherData: CurrentWeather) => {
        this.currentWeatherData = currentWeatherData;
      })
    )
  }

  getForecast(lat: number, lon: number): Observable<any> {
    return this.http.get(`${this.API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${environment.weatherMapAPI.apiKey}`).pipe(
      map((data) => data)
    );
  }
}
