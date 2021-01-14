import { MapType } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameMap, MapPoint } from 'app/game-map/game-map';
import { MapText } from 'app/game-map/map-text';
import { MoveMap } from 'app/game-map/move-map';
import gameMap from '../../../game-map/game-map.json';
import mapText from '../../../game-map/map-text.json';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {

  newDirection: MoveMap;
  currentMapPoint: MapPoint;
  currentMapText: MapText;
  start: boolean;

  private _gameMap: GameMap;
  private _mapText: MapText[];

  constructor(private _router: Router) { 
    this.start = false;

    this._gameMap = {} as GameMap;
    Object.assign(this._gameMap, gameMap);
    console.log('this.gameMap: ', this._gameMap.mapPoints);
    this.currentMapPoint = this._gameMap.mapPoints[0]

    this._mapText = {} as MapText[];
    Object.assign(this._mapText, mapText);
    this.currentMapText = this._mapText[0];
    console.log('Current Text: ', this.currentMapText);
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
        this.newDirection = newDirection;
        this.currentMapText = this._mapText[this.currentMapPoint.currentPosition];
      }
    })
  }

}
