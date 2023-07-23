import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CurrentWeatherComponent } from './pages/current-weather/current-weather.component';
import { ForecastComponent } from './pages/forecast/forecast.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { currentWeatherInitializer } from './initializers/current-weather.initializer';
import { LocationService } from './services/location/location.service';
import { WeatherService } from './services/weather/weather.service';
import { DatePipe } from '@angular/common';
import { LoadingInterceptor } from './interceptors/loading.interceptor';

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
    DatePipe,
    { provide: APP_INITIALIZER, useFactory: currentWeatherInitializer, deps: [LocationService, WeatherService], multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
