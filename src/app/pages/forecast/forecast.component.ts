import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Coords } from 'src/app/models/client/location';
import { ForecastWeather, IWeather } from 'src/app/models/client/weather';
import { LocationService } from 'src/app/services/location/location.service';
import { WeatherService } from 'src/app/services/weather/weather.service';

type ForecastDay = {
  list: Array<IWeather>,
  day: string,
  tempMin: number,
  tempMax: number,
  average: number
  icon: string,
}

type DayGroups = Array<ForecastDay>

type DayObjectGroups = { [key: string]: ForecastDay }

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit {
  forecastWeather$!: Observable<ForecastWeather>;
  forecastWeatherGroupedByDay$!: Observable<DayGroups>;
  selectedDay!: ForecastDay;

  constructor(private weatherService: WeatherService, private locationService: LocationService, private datePipe: DatePipe) { }

  ngOnInit() {
    const currentCoordinates: Coords = this.locationService.currentCoordinates();
    this.forecastWeather$ = this.weatherService.getForecast(currentCoordinates.lon, currentCoordinates.lat);
    this.forecastWeatherGroupedByDay$ = this.forecastWeather$.pipe(
      map((data: ForecastWeather) => {
        // Group by day
        return data.days.reduce((group: DayObjectGroups, day) => {
          const { date } = day;
          const dayName = this.datePipe.transform(date, 'EEEE') || -1;
          group[dayName] = group[dayName] ?? {
            list: [],
            day: dayName,
            icon: '',
            tempMin: day.weather.tempMin,
            tempMax: day.weather.tempMax,
            average: day.weather.temp
          };
          group[dayName].list.push(day);
          return group;
        }, {});
      }),
      map((groupedByDays) => {
        Object.keys(groupedByDays).forEach(key => {
          let tempSum: number = groupedByDays[key].list.reduce((sum, day) => {
            sum += day.weather.temp;

            if (day.weather.tempMin < groupedByDays[key].tempMin) {
              groupedByDays[key].tempMin = day.weather.tempMin;
            }

            if (day.weather.tempMax > groupedByDays[key].tempMax) {
              groupedByDays[key].tempMax = day.weather.tempMax;
            }

            groupedByDays[key].icon = groupedByDays[key].list[Math.floor(groupedByDays[key].list.length / 2)].weather.icon;

            return sum;
          }, 0);
          groupedByDays[key].average = tempSum / groupedByDays[key].list.length;
        })

        return Object.values(groupedByDays);
      })
    );
  }
}
