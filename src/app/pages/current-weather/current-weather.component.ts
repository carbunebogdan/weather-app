import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrentWeather } from 'src/app/models/client/weather';
import { WeatherService } from 'src/app/services/weather/weather.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrentWeatherComponent implements OnInit {
  currentWeather$!: Observable<CurrentWeather>;

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.currentWeather$ = this.weatherService.currentWeatherData;
  }
}
