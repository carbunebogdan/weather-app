import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CurrentWeatherComponent } from './pages/current-weather/current-weather.component';
import { ForecastComponent } from './pages/forecast/forecast.component';
import { HttpClientModule } from '@angular/common/http';
import { currentWeatherInitializer } from './initializers/current-weather.initializer';
import { LocationService } from './services/location/location.service';
import { WeatherService } from './services/weather/weather.service';

@NgModule({
  declarations: [
    AppComponent,
    CurrentWeatherComponent,
    ForecastComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: currentWeatherInitializer, deps: [LocationService, WeatherService], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
