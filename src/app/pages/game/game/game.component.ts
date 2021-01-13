import { MapType } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameMap } from 'app/game-map/game-map';
import gameMap from '../../../game-map/game-map.json';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {

  start: boolean;

  _gameMap: GameMap;

  constructor(private _router: Router) { 
    this.start = false;
    // this._gameMap = Object.assign(this._gameMap as , JSON.parse(gameMap));
    // this.gameMap = gameMap;
    // const _gmeMap = gameMap as GameMap;
    this._gameMap = {} as GameMap;
    Object.assign(this._gameMap, gameMap);
    console.log('gameMap json: ', gameMap);
    console.log('gameMap: ', this._gameMap.mapPoints);
  }

  startGame() {
    console.log('Stating game');
    this.start = true;
    // this._router.navigate(['game']);
  }

  travel(direction: string) {
    console.log('Direction: ', direction);

  }

}
