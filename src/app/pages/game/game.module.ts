import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThemeModule } from 'theme';
import { GameComponent } from './game/game.component';
import { NgTypedModule } from 'ng-typed';


@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    NgTypedModule
  ],
  declarations: [
    GameComponent
  ],
})
export class GameModule {}
