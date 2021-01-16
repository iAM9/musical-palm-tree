import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import Player from 'app/emotion-engine/Player';


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, OnChanges {


  private _player: Player;
  anger = 0;
  happiness = 0;
  fear = 0;
  sadness = 0;

  @Output() travelEvent = new EventEmitter<string>();

  @Input() set player(player: Player) {
    if (!player) {
      this._player = null;
      return;
    }
    this._player = player;
    this.setBars();
    this.setColour();
  }

  get player(): Player {
    return this._player;
  }

  constructor() {
  }

  ngOnChanges(): void {
    this.setBars;
    this.setColour();
  }

  ngOnInit(): void {
  }

  travel(direction: string) {
    this.travelEvent.emit(direction);
  }

  setBars() {
    console.error('Setting bars');
    this.anger = this._player.currentMood.anger * 100;
    this.fear = this._player.currentMood.fear * 100;
    this.happiness = this._player.currentMood.happiness * 100;
    this.sadness = this._player.currentMood.sadness * 100;
    console.warn('PLayer currentMood: ', this.player.currentMood);
  }

  setColour() {
    console.log('Player currentMood: ', this._player.currentMood);
    const maxColourAmt = Math.max(
      this._player.currentMood.anger,
      this._player.currentMood.fear,
      this._player.currentMood.happiness,
      this._player.currentMood.sadness,
      );
    
    if (maxColourAmt === this._player.currentMood.anger) {
      document.getElementById('player').style.backgroundColor = 'firebrick';
      document.getElementById('player').style.transition = 'background-color 2s ease-in-out';
    } 
    if (maxColourAmt === this._player.currentMood.happiness) {
      document.getElementById('player').style.backgroundColor = 'orange';
      document.getElementById('player').style.transition = 'background-color 2s ease-in-out';
    } 
    if (maxColourAmt === this._player.currentMood.sadness) {
      document.getElementById('player').style.backgroundColor = 'teal';
      document.getElementById('player').style.transition = 'background-color 2s ease-in-out';
    } 
    if (maxColourAmt === this._player.currentMood.fear) {
      document.getElementById('player').style.backgroundColor = 'darkgreen';
      document.getElementById('player').style.transition = 'background-color 2s ease-in-out';
    }  
  }

}
