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
import { Dialogue, MapText } from 'app/game-map/map-text';
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
  initialMood = {
    anger: 0.0,
    fear: 0.0,
    happiness: 0.0,
    sadness: 0.0
  };
  newPlayerMood = {
    anger: 0.0,
    fear: 0.6,
    happiness: 0.2,
    sadness: 0.5
  };
  player: Player;
  npc: NPC;

  private _gameMap: GameMap;
  private _mapText: MapText[];

  constructor(
    private _router: Router,
    private _emotionEngineService: EmotionEngineService
  ) {
    this.player = new Player(this.initialMood);
    this.npc = new NPC();
    this.start = false;

    // Initialize the game map
    this._gameMap = {} as GameMap;
    Object.assign(this._gameMap, gameMap);
    console.log('this.gameMap: ', this._gameMap.mapPoints);
    this.currentMapPoint = this._gameMap.mapPoints[0]

    // Retreive the map text  the game map
    this._mapText = {} as MapText[];
    Object.assign(this._mapText, mapText);
    this.currentMapText = this._mapText[0];
    console.log('Current Text: ', this.currentMapText);

    // const emotion: Emotion = {
    //   anger: 0,
    //   sadness: 0,
    //   fear: 0,
    //   happiness: 0
    // };
    // console.warn('NPC: ', this.npc.personality(emotion));
    // console.error('Player: ', this.player.personality(emotion));

    const context: Context = {
      currentMood: this.player.currentMood,
      personality: this.player.personality
    }
    this._emotionEngineService.affects(context, this.currentMapText.stimuli).subscribe(newMood => {
      this.player.currentMood = newMood;
      this.player = new Player(this.player.currentMood);
    });
  }

  /**
   * Start the game
   */
  startGame() {
    console.log('Stating game');
    this.start = true;
    // this._router.navigate(['game']);
  }

  /**
   * Handle map traversal
   */
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

  npcEmotion(dialog: Dialogue): void {
    const charactersContext: Context[] = [
      {
      currentMood: this.player.currentMood,
      personality: this.player.personality
    },
    {
      currentMood: this.npc.currentMood,
      personality: this.npc.personality
    }
  ];
  console.table(charactersContext);
  this._emotionEngineService.affects(charactersContext[0], dialog.stimuli).subscribe(newMood => {
    this.player.currentMood = newMood;
    this.player = new Player(this.player.currentMood);
  });

  this._emotionEngineService.affects(charactersContext[1], dialog.stimuli).subscribe(newMood => {
    this.npc.currentMood = newMood;
    this.npc = new NPC(this.npc.currentMood);
  });



  }

}
