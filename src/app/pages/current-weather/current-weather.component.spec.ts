import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentWeatherComponent } from './current-weather.component';
import { WeatherService } from 'src/app/services/weather/weather.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('CurrentWeatherComponent', () => {
  let component: CurrentWeatherComponent;
  let fixture: ComponentFixture<CurrentWeatherComponent>;

  const mockCurrentWeatherData = {
    city: 'Mock City',
    country: 'Mock Country',
    date: new Date(),
    weather: { temp: 25, description: 'Mock Weather', icon: 'Mock Icon', tempMax: 30, tempMin: 20 },
    wind: { speed: 10 },
    sunrise: new Date(),
    sunset: new Date(),
    rain: 0
  };

  const weatherService = jasmine.createSpyObj('WeatherService', [], { currentWeatherData: of(mockCurrentWeatherData) });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrentWeatherComponent],
      providers: [
        { provide: WeatherService, useValue: weatherService }
      ],
      imports: [
        RouterTestingModule
      ]
    });
    fixture = TestBed.createComponent(CurrentWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize currentWeather$', () => {
    expect(component.currentWeather$).toEqual(weatherService.currentWeatherData);
  });
});
