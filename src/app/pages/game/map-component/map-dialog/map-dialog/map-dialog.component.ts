import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import NPC from 'app/emotion-engine/NPC';
import { Dialogue } from 'app/game-map/map-text';


@Component({
  selector: 'app-map-dialog',
  templateUrl: './map-dialog.component.html',
  styleUrls: ['./map-dialog.component.scss']
})
export class MapDialogComponent {

  /** The set of Dialogus and the current dialogue */
  dialogue: Dialogue[];
  currentDialogue: Dialogue;

  /** The current NPC character being interacted with */
  npc: NPC;

  /** Flag to check if interaction has been completed or not */
  answered = false;

  /**
   * 
   * @param _dialogRef The ref to the current dialog component
   * @param data Injected data from the parent component
   */
  constructor(
    private _dialogRef: MatDialogRef<MapDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      dialogue: Dialogue[],
      npc: NPC
    }) {
    this.dialogue = data.dialogue;
    this.currentDialogue = this.dialogue[0];
    this.npc = data.npc;
    console.log('Dialogues: ', this.dialogue);
    console.log('NPC: ', this.npc);
  }

  /**
   * Handle the interaction between the player and npc
   * 
   * @param ans Yes/No answer
   */
  answer(ans: boolean): void {
    if (ans) {
      this.currentDialogue = this.dialogue[1]
    }
    if (!ans) {
      this.currentDialogue = this.dialogue[2]
    }
    this.answered = true;
    // this.currentDialogueEmotion.emit(this.currentDialogue);
  }

  /**
   * Ends the interaction with the NPC by closing the dialog box and returning the last conversation held
   */
  endConversation(): void {
    this._dialogRef.close(this.currentDialogue);
  }

}
