import { Injectable } from '@angular/core';
import { Coords } from 'src/app/models/location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }

  getLocation(): Promise<Coords> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((resp: GeolocationPosition) => {
        resolve({ lon: resp.coords.longitude, lat: resp.coords.latitude });
      },
        err => {
          reject(err);
        });
    });
  }
}
