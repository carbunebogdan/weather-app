import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() { }

  setLoading(isLoading: boolean) {
    this.isLoading$.next(isLoading);
  }
}
