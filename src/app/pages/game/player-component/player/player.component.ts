import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Player } from 'app/emotion-engine/Player';


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnChanges {

  /** The player character */
  private _player: Player;

  /** Initialize attributes for visual components */
  textAnimation = '';
  anger = 0;
  happiness = 0;
  fear = 0;
  sadness = 0;
  feel = '';

  /** Event emitter for travel events */
  @Output() travelEvent = new EventEmitter<string>();

  /**
   * Set the current Player character
   */
  @Input() set player(player: Player) {
    if (!player) {
      this._player = null;
      return;
    }
    this._player = player;
    this.setBars();
    this.setVisuals();
  }

  /**
   * Gets the curret player character
   */
  get player(): Player {
    return this._player;
  }

  /** Constructor */
  constructor() {  }

  /**
   * Detects changes
   */
  ngOnChanges(): void {
    this.setBars;
    this.setVisuals();
  }


  /**
   * Emits the new travel direction
   * @param direction New direction to travel
   */
  travel(direction: string) {
    this.travelEvent.emit(direction);
  }

  /**
   * Sets the progress-bar values in the progress components
   */
  setBars() {
    console.error('Setting bars');
    this.anger = this._player.currentMood.anger * 100;
    this.fear = this._player.currentMood.fear * 100;
    this.happiness = this._player.currentMood.happiness * 100;
    this.sadness = this._player.currentMood.sadness * 100;
    console.warn('PLayer currentMood: ', this.player.currentMood);
  }

  /**
   * Sets the colour and the text-shake animation in the Player's visual components
   */
  setVisuals() {
    console.log('Player currentMood: ', this._player.moodColour);
    document.getElementById('player').style.backgroundColor = this._player.moodColour;
    document.getElementById('player').style.transition = 'background-color 2s ease-in-out';
    this.textAnimation = this._player.textAnimation;
    this.feel = this._player.moodText;
  }

}
