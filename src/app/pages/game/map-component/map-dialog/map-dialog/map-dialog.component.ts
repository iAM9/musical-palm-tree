import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import NPC from 'app/emotion-engine/NPC';
import { Dialogue } from 'app/game-map/map-text';


@Component({
  selector: 'app-map-dialog',
  templateUrl: './map-dialog.component.html',
  styleUrls: ['./map-dialog.component.scss']
})
export class MapDialogComponent implements OnInit {

  dialogue: Dialogue[];
  currentDialogue: Dialogue;

  npc: NPC;

  answered = false;

  // @Output() currentDialogueEmotion = new EventEmitter<Dialogue>();

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

  ngOnInit(): void { }

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

  endConversation(): void {
    this._dialogRef.close(this.currentDialogue);
  }

}
