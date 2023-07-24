import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastComponent } from './forecast.component';
import { DatePipe } from '@angular/common';
import { of } from 'rxjs';
import { LocationService } from 'src/app/services/location/location.service';
import { WeatherService } from 'src/app/services/weather/weather.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('ForecastComponent', () => {
  let component: ForecastComponent;
  let fixture: ComponentFixture<ForecastComponent>;
  let locationService: jasmine.SpyObj<LocationService>;
  let weatherService: jasmine.SpyObj<WeatherService>;
  let datePipe: jasmine.SpyObj<DatePipe>;

  const mockCoordinates = { lat: 1, lon: 1 };
  const mockForecastWeather = {
    days: [
      { date: new Date(), weather: { temp: 20, tempMin: 15, tempMax: 25, icon: 'icon1' } },
      { date: new Date(), weather: { temp: 25, tempMin: 20, tempMax: 30, icon: 'icon2' } }
    ]
  };

  locationService = jasmine.createSpyObj('LocationService', ['currentCoordinates']);
  locationService.currentCoordinates.and.returnValue(mockCoordinates);

  weatherService = jasmine.createSpyObj('WeatherService', ['getForecast']);
  weatherService.getForecast.and.returnValue(of(mockForecastWeather));

  datePipe = jasmine.createSpyObj('DatePipe', ['transform']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForecastComponent],
      providers: [
        { provide: LocationService, useValue: locationService },
        { provide: WeatherService, useValue: weatherService },
        DatePipe
      ],
      imports: [
        RouterTestingModule
      ]
    });
    fixture = TestBed.createComponent(ForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should get the forecast on initialization', () => {
    expect(weatherService.getForecast).toHaveBeenCalledWith(mockCoordinates.lon, mockCoordinates.lat);
  });

  it('should initialize forecast weather and group by day', () => {
    const today = new Date();
    const tomorrow = new Date().setDate(new Date().getDate() + 1);
    const mockForecastWeather = {
      days: [
        { date: today, weather: { temp: 20, tempMin: 15, tempMax: 25, icon: 'icon1' } },
        { date: tomorrow, weather: { temp: 25, tempMin: 20, tempMax: 30, icon: 'icon2' } }
      ]
    };

    const expectedGroupedByDays = [{
      list: [
        { date: today, weather: { temp: 20, tempMin: 15, tempMax: 25, icon: 'icon1' } }
      ],
      day: 'Monday',
      tempMin: 15,
      tempMax: 25,
      average: 20,
      icon: 'icon1'
    }, {
      list: [
        { date: tomorrow, weather: { temp: 25, tempMin: 20, tempMax: 30, icon: 'icon2' } }
      ],
      day: 'Tuesday',
      tempMin: 20,
      tempMax: 30,
      average: 25,
      icon: 'icon2'
    }];

    weatherService.getForecast.and.returnValue(of(mockForecastWeather));
    datePipe.transform.and.returnValue('Monday');

    component.ngOnInit();

    expect(component.forecastWeather$).toBeDefined();
    expect(component.forecastWeatherGroupedByDay$).toBeDefined();

    component.forecastWeatherGroupedByDay$.subscribe((groupedData: any) => {
      expect(groupedData).toEqual(expectedGroupedByDays);
    });
  });
});
