import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Dialogue } from 'app/game-map/map-text';

@Component({
  selector: 'app-map-dialog',
  templateUrl: './map-dialog.component.html',
  styleUrls: ['./map-dialog.component.scss']
})
export class MapDialogComponent implements OnInit {

  dialogue: Dialogue[];
  currentDialogue: Dialogue;
  noNum = 1;
  yesNum = 2;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {dialogue: Dialogue[]}) {
    this.dialogue = data.dialogue;
    this.currentDialogue = this.dialogue[0];
    console.log('Dialogues: ', this.dialogue);
  }

  ngOnInit(): void {
  }

  yes() {
    this.currentDialogue = this.dialogue[this.yesNum]
    this.yesNum = this.yesNum + 2;
  }

  no() {
    this.currentDialogue = this.dialogue[this.noNum]
    this.noNum = this.noNum + 2;
  }

}
