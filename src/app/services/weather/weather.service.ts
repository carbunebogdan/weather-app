import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private API_URL: string = `${environment.weatherMapAPI.baseApiUrl}/data/${environment.weatherMapAPI.version}`;

  constructor(private http: HttpClient) { }

  getCurrentWeather(lat: number, lon: number): Observable<any> {
    return this.http.get(`${this.API_URL}/weather?lat=${lat}&lon=${lon}&appid=${environment.weatherMapAPI.apiKey}`).pipe(
      map((data) => data)
    )
  }

  getForecast(lat: number, lon: number): Observable<any> {
    return this.http.get(`${this.API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${environment.weatherMapAPI.apiKey}`).pipe(
      map((data) => data)
    );
  }
}
