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

  /** The target direction */
  newDirection: MoveMap;

  /** Current map location/point */
  currentMapPoint: MapPoint;

  /** Current map location text */
  currentMapText: MapText;

  /** Start flag */
  start: boolean;

  /** The main player character */
  player: Player;

  /** The NPC character being interacted with */
  npc: NPC;

  /** The game map and the corresponding text; parsed from JSON files */
  private _gameMap: GameMap;
  private _mapText: MapText[];

  /**
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
   */

  /**
   * Init the vars and start the game
   * @param _router 
   * @param _emotionEngineService The emotion engine service
   */
  constructor(
    private _router: Router,
    private _emotionEngineService: EmotionEngineService
  ) {

    // Init new player and one new npc
    this.player = new Player();
    this.npc = new NPC();
    this.start = false;

    // Initialize the game map; first parse it from the JSON file
    this._gameMap = {} as GameMap;
    Object.assign(this._gameMap, gameMap);
    console.log('this.gameMap: ', this._gameMap.mapPoints);

    // Set the beginning location
    this.currentMapPoint = this._gameMap.mapPoints[0]

    // Retreive the map text for the game map; first parse it from the JSON file
    this._mapText = {} as MapText[];
    Object.assign(this._mapText, mapText);
    console.log('Current Text: ', this.currentMapText);

    // Set the beginng map text
    this.currentMapText = this._mapText[0];

    // Set the emotion context for the main player
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

  /**
   * Set the new emotion contexts for both the NPC and the player character based on the emotional stimuli of the conversation
   * @param dialog The conversation held with the NPC
   */
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
