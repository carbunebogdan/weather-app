import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, of, tap } from 'rxjs';
import { environment } from 'src/environment/environment';
import { CurrentWeather, ForecastWeather } from 'src/app/models/client/weather';
import { CurrentWeatherResponse, ForecastResponse } from 'src/app/models/api/weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private API_URL: string = `${environment.weatherMapAPI.baseApiUrl}/data/${environment.weatherMapAPI.version}`;
  public currentWeatherData!: BehaviorSubject<CurrentWeather>;

  constructor(private http: HttpClient) { }

  getCurrentWeather(lat: number, lon: number): Observable<CurrentWeather> {
    return this.http.get(`${this.API_URL}/weather?lat=${lat}&lon=${lon}&appid=${environment.weatherMapAPI.apiKey}&units=metric`).pipe(
      map((data) => new CurrentWeather(data as CurrentWeatherResponse)),
      tap((currentWeatherData: CurrentWeather) => {
        if (!this.currentWeatherData) {
          this.currentWeatherData = new BehaviorSubject(currentWeatherData);
        } else {
          this.currentWeatherData.next(currentWeatherData);
        }
      })
    )
  }

  getForecast(lat: number, lon: number, cnt = 32): Observable<any> {
    // Check if the data is in cache and is from today
    const today = new Date().setHours(0, 0, 0, 0);
    const forecastCacheRaw = localStorage.getItem('forecastCache');
    const forecastCache = forecastCacheRaw && JSON.parse(forecastCacheRaw);

    if (forecastCache && new Date(forecastCache.date).setHours(0, 0, 0, 0) === today) {
      return of(new ForecastWeather(forecastCache.data as ForecastResponse)); // If it is, return cached data
    }

    return this.http.get(`${this.API_URL}/forecast?lat=${lat}&lon=${lon}&cnt=${cnt}&appid=${environment.weatherMapAPI.apiKey}&units=metric`).pipe(
      tap((data) => {
        localStorage.setItem('forecastCache', JSON.stringify({ // Cache the fetched data
          date: new Date(),
          data: data
        }));
      }),
      map((data) => new ForecastWeather(data as ForecastResponse))
    );
  }
}
