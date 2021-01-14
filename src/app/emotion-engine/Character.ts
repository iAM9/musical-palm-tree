import { Emotion } from "./types/emotion";
import { IEmotion } from "./types/iemotion";
import { Mood } from "./types/mood";

class Character implements IEmotion {
    /** The current mood of the character */
    mood: Emotion;

    /**
     * Constructor and initialize the mood
     */
    constructor() {
        this.mood = '';
    }
    
    /**
     * 
     * @param stimuli The external stimuli that will update the mood of the character
     */
    public personality(stimuli: Emotion): Mood {
        console.log('This is the personality mapping function');
        console.log('Incoming stimuli: ', stimuli);
        return this.mood;
    }
}
export default Character;