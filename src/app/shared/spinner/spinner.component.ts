import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from '../../core/_service/loader.service';


@Component({ selector: 'app-spinner', templateUrl: './spinner.component.html', styleUrl: './spinner.component.scss' })
export class SpinnerComponent implements OnDestroy {
  loading!: boolean;
  _subscription: Subscription;

  constructor(private loadingService: LoaderService) {
    this._subscription = this.loadingService.loading$.subscribe(
      (loading) => (this.loading = loading)
    );
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}