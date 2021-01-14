import { Component, Input, OnInit } from '@angular/core';
import { GameMap, MapPoint } from 'app/game-map/game-map';
import { MoveMap } from 'app/game-map/move-map';
import gameMap from '../../../../game-map/game-map.json';
import TypeWriter from 'lightweight-typewriter';
import { MapText } from 'app/game-map/map-text';
import { MapDialogComponent } from '../map-dialog/map-dialog/map-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-map-component',
  templateUrl: './map-component.component.html',
  styleUrls: ['./map-component.component.scss']
})
export class MapComponentComponent implements OnInit {
  private _currentMapText: MapText;

  @Input() set newDirection(newDir: MoveMap) {
    if (!newDir) {
      movePlayerDot(-200, -200, 0, 0);
      return;
    }

    newDir.currentMapPoint.pathsFromCurrentPosition.find(path => {
      if (path.direction === newDir.moveDirection) {
        movePlayerDot(newDir.currentMapPoint.x, newDir.currentMapPoint.y, path.x, path.y);
      }
    });
  }

  @Input() set currentMapText(mapText: MapText) {
    console.log('Text: ', mapText.text);
    if (!mapText || !mapText.text) {
      return;
    }
    fadeOutText();
    this._currentMapText = mapText;
  }

  get currentMapText(): MapText {
    return this._currentMapText;
  }

  constructor(private _dialogRef: MatDialog) {  }

  ngOnInit(): void {  }

  interact() {
    console.log('Interacting with NPC: ', this.currentMapText);
    const dialogRef = this._dialogRef.open(MapDialogComponent, {
      data: {
        dialogue: this.currentMapText.dialogue
      }
    });
  }

}

function fadeOutText(){
  document.getElementById('text').animate([
    { opacity: 0 },
    { opacity: 1 },
  ], {
    easing: 'ease',
    duration: 1000
  });
}

function fadeInText(){
  document.getElementById('text').animate([
    { opacity: 1 },
  ], {
    easing: 'ease',
    duration: 2000
  });
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

