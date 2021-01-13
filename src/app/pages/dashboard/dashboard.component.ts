import { Component, HostBinding } from '@angular/core';
import { Router } from '@angular/router';

import { UpgradableComponent } from 'theme/components/upgradable';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent extends UpgradableComponent {
  @HostBinding('class.mdl-grid') public readonly mdlGrid = true;

    constructor(private _router: Router) {
      super();
    }
  
  startGame() {
    console.log('Starting game');
    this._router.navigate(['app/game']);
  }
}
