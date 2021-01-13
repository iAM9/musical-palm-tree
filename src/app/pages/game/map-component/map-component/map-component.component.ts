import { Component, Input, OnInit } from '@angular/core';
import { GameMap, MapPoint } from 'app/game-map/game-map';
import { MoveMap } from 'app/game-map/move-map';
import gameMap from '../../../../game-map/game-map.json';

@Component({
  selector: 'app-map-component',
  templateUrl: './map-component.component.html',
  styleUrls: ['./map-component.component.scss']
})
export class MapComponentComponent implements OnInit {

  @Input() set newDirection(newDir: MoveMap) {
    if (!newDir) {
      movePlayerDot(-200, -200, 0, 0);
      return;
    }
    // console.log('Incoming direction: ', newDir);
    newDir.currentMapPoint.pathsFromCurrentPosition.find(path => {
      // console.log('Path: ', path);
      if (path.direction === newDir.moveDirection) {
        movePlayerDot(newDir.currentMapPoint.x, newDir.currentMapPoint.y, path.x, path.y);
        // console.log('found!');
      } else {
        // console.log('not found!');
      }
    });

  }
  
  private _gameMap: GameMap;

  constructor() {

    // this._gameMap = {} as GameMap;
    // Object.assign(this._gameMap, gameMap);
    // console.log('gameMap json: ', gameMap);
    // console.log('gameMap: ', this._gameMap.mapPoints);
  }

  ngOnInit(): void {
  }

}

function movePlayerDot(x_from, y_from, x_to, y_to) {
  document.getElementById('player-dot').animate([
    { transform: `translate(${x_from}px,${y_from}px)` },
    { transform: `translate(${x_to}px,${y_to}px)` },
  ], {
    fill: 'forwards',
    easing: 'ease',
    duration: 3000,
  });
}

