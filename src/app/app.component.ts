import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LoadingService } from './services/ui/loading.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'weatherApp';
  isLoading$!: Observable<boolean>;

  constructor(private loadingService: LoadingService) { }

  ngOnInit() {
    this.isLoading$ = this.loadingService.isLoading$;
  }
}
