import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThemeModule } from 'theme';
import { GameComponent } from './game/game.component';
// import { NgTypedModule } from 'ng-typed';
import { MapComponentComponent } from './map-component/map-component/map-component.component';
import { MapDialogComponent } from './map-component/map-dialog/map-dialog/map-dialog.component';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import { PlayerComponent } from './player-component/player/player.component';


@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    MatInputModule,
    MatDialogModule,
    ThemeModule
    // MatDialogModule,
    // MatButtonModule
    // NgTypedModule
  ],
  declarations: [
    GameComponent,
    MapComponentComponent,
    MapDialogComponent,
    PlayerComponent
  ],
})
export class GameModule {}
