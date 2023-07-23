import { Injectable, signal } from '@angular/core';
import { Coords } from 'src/app/models/client/location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  public currentCoordinates = signal({ lon: 0, lat: 0 });

  constructor() { }

  getLocation(): Promise<Coords> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((resp: GeolocationPosition) => {
        const coords = { lon: resp.coords.longitude, lat: resp.coords.latitude };
        this.currentCoordinates.update((old) => ({ ...old, ...coords }));
        resolve(coords);
      },
        err => {
          reject(err);
        });
    });
  }
}
