import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './pages/dashboard';
import { GameModule } from './pages/game/game.module';

import { NgTypedModule } from 'ng-typed';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    GameModule,
    NgTypedModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
