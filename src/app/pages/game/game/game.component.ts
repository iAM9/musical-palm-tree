import { MapType } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Character from 'app/emotion-engine/Character';
import { EmotionEngineService } from 'app/emotion-engine/emotion-engine.service';
import NPC from 'app/emotion-engine/NPC';
import { Player } from 'app/emotion-engine/Player';

import { Context } from 'app/emotion-engine/types/context';
import { Emotion } from 'app/emotion-engine/types/emotion';
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
  initialPlayerMood = {
    anger: 0.7,
    fear: 0.56,
    happiness: 0.4,
    sadness: 0.2
  };
  newPlayerMood = {
    anger: 0.5,
    fear: 0.6,
    happiness: 0.2,
    sadness: 0.5
  };
  player: Player;

  private _gameMap: GameMap;
  private _mapText: MapText[];

  constructor(
    private _router: Router,
    private _emotionEngineService: EmotionEngineService
    ) {
    this.player = new Player(this.initialPlayerMood);
    this.start = false;

    this._gameMap = {} as GameMap;
    Object.assign(this._gameMap, gameMap);
    console.log('this.gameMap: ', this._gameMap.mapPoints);
    this.currentMapPoint = this._gameMap.mapPoints[0]

    this._mapText = {} as MapText[];
    Object.assign(this._mapText, mapText);
    this.currentMapText = this._mapText[0];
    console.log('Current Text: ', this.currentMapText);
    const emotion: Emotion = {
      anger: 0,
      sadness: 0,
      fear: 0,
      happiness: 0
    };
    const npc = new NPC(emotion);
    console.warn('NPC: ', npc.personality(emotion));
    console.table(['asd', 'asd', 'zxczxc']);
    // console.error('Player: ', this.player.personality(emotion));
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
        const context: Context = {
          currentMood: this.player.currentMood,
          personality: this.player.personality
          }
        this._emotionEngineService.affects(context, this.currentMapText.stimuli).subscribe(newMood => {
          this.player.currentMood = newMood;
          this.player = new Player(this.player.currentMood);
        });
        
      }
    })
  }

}
