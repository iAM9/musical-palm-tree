import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GameMap, MapPoint } from 'app/game-map/game-map';
import { MoveMap } from 'app/game-map/move-map';
import gameMap from '../../../../game-map/game-map.json';
import TypeWriter from 'lightweight-typewriter';
import { Dialogue, MapText } from 'app/game-map/map-text';
import { MapDialogComponent } from '../map-dialog/map-dialog/map-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import NPC from 'app/emotion-engine/NPC';


@Component({
  selector: 'app-map-component',
  templateUrl: './map-component.component.html',
  styleUrls: ['./map-component.component.scss']
})
export class MapComponentComponent {
  /** The current map text */
  private _currentMapText: MapText;

  /** Even emitter for the current emotional stimuli of conversation held with the NPC */
  @Output() npcEmotion = new EventEmitter<Dialogue>();

  /** The current NPC being interacted with */
  @Input() npc: NPC;

  /** Set the new direction of the plater */
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

  /** Sets the current map text */
  @Input() set currentMapText(mapText: MapText) {
    console.log('Text: ', mapText.text);
    if (!mapText || !mapText.text) {
      return;
    }
    fadeOutText();
    this._currentMapText = mapText;
  }

  /** Gets the curret map text */
  get currentMapText(): MapText {
    return this._currentMapText;
  }

  /**
   * The dialog ref 
    */
  constructor(private _dialogRef: MatDialog) { }

  /**
   * Interact with the player and NPC
   */
  interact() {
    console.log('Interacting with NPC: ', this.currentMapText);
    const dialogRef = this._dialogRef.open(MapDialogComponent, {
      data: {
        dialogue: this.currentMapText.dialogue,
        npc: this.npc
      }
    });

    dialogRef.afterClosed().subscribe((dialog: Dialogue) => {
      console.warn('Current dialogie emotion: ', dialog);
      this.npcEmotion.emit(dialog);

      let npcColour = '';

      const maxColourAmt = Math.max(
        dialog.stimuli.anger,
        dialog.stimuli.fear,
        dialog.stimuli.happiness,
        dialog.stimuli.sadness,
      );

      if (maxColourAmt === dialog.stimuli.anger) {
        npcColour = 'firebrick';

      }
      if (maxColourAmt === dialog.stimuli.happiness) {
        npcColour = 'orange';

      }
      if (maxColourAmt === dialog.stimuli.sadness) {
        npcColour = 'teal';

      }
      if (maxColourAmt === dialog.stimuli.fear) {
        npcColour = 'darkgreen';

      }
      document.getElementById('npc-dot').style.backgroundColor = npcColour;
    })
  }

}

//////////////////////////////////////
/****  HELPER FUNCTION FOR VISUALS */
//////////////////////////////////////
function fadeOutText() {
  document.getElementById('text').animate([
    { opacity: 0 },
    { opacity: 1 },
  ], {
    easing: 'ease',
    duration: 1000
  });
}

function fadeInText() {
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

