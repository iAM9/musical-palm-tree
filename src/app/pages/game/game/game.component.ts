import { MapType } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameMap, MapPoint } from 'app/game-map/game-map';
import { MoveMap } from 'app/game-map/move-map';
import gameMap from '../../../game-map/game-map.json';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {

  newDirection: MoveMap;
  currentMapPoint: MapPoint;
  start: boolean;

  private _gameMap: GameMap;

  constructor(private _router: Router) { 
    this.start = false;

    this._gameMap = {} as GameMap;
    Object.assign(this._gameMap, gameMap);
    console.log('this.gameMap: ', this._gameMap.mapPoints);
    this.currentMapPoint = this._gameMap.mapPoints[0]
  }

  startGame() {
    console.log('Stating game');
    this.start = true;
    // this._router.navigate(['game']);
  }

  travel(direction: string) {
    this.currentMapPoint.pathsFromCurrentPosition.find(path => {
      if (path.direction === direction) {
        const newDirection: MoveMap = {
          moveDirection: direction,
          currentMapPoint: this.currentMapPoint,
        };
        this.currentMapPoint = this._gameMap.mapPoints[path.pathPosition];
        console.log('Direction: ', newDirection);
        console.log('New path: ', this.currentMapPoint);
        this.newDirection = newDirection;
      }
    })
  }

}
