import { Emotion } from './types/emotion';
import { IEmotion } from './types/iemotion';
import { Mood } from './types/mood';

abstract class Character implements IEmotion {
    /** The current mood of the character */
  currentMood: Emotion;

  constructor();
  // tslint:disable-next-line: unified-signatures
  constructor(intialMood: Emotion);

    /**
     * Constructor and initialize the mood
     */
  constructor(initialMood?: Emotion) {
    this.currentMood = initialMood;
  }

    /**
     * 
     * @param stimuli The external stimuli that will update the mood of the characters
     */
  public personality(stimuli: Emotion): Emotion {
    // tslint:disable-next-line: no-console
    console.log('This is the personality mapping function');
    // tslint:disable-next-line: no-console
    console.log('Incoming stimuli: ', stimuli);
    return this.currentMood;
  }
}
export default Character;