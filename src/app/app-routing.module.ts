import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrentWeatherComponent } from './pages/current-weather/current-weather.component';
import { ForecastComponent } from './pages/forecast/forecast.component';

const routes: Routes = [
  {
    path: '',
    component: CurrentWeatherComponent
  },
  {
    path: 'four-days',
    component: ForecastComponent
  },
  {
    path: '**',
    redirectTo: '',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
