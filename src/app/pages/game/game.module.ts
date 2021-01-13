import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThemeModule } from 'theme';
import { GameComponent } from './game/game.component';
import { NgTypedModule } from 'ng-typed';
import { MapComponentComponent } from './map-component/map-component/map-component.component';


@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    NgTypedModule
  ],
  declarations: [
    GameComponent,
    MapComponentComponent
  ],
})
export class GameModule {}
