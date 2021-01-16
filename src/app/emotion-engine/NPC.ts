import Character from "./Character";
import { Emotion } from "./types/emotion";
import { IEmotion } from "./types/iemotion";
import { Mood } from "./types/mood";

class NPC extends Character {
    /** The current mood of the character */
    currentMood: Emotion;

    /**
     * Constructor and initialize the mood
     */
    constructor(initialMood: Emotion) {
        super(initialMood);
    }
    
    /**
     * 
     * @param stimuli The external stimuli that will update the mood of the character
     */
    public personality(stimuli: Emotion): Emotion {
        console.log('This is the personality mapping function OF NPC');
        console.log('Incoming stimuli OF NPC: ', stimuli);
        return this.currentMood;
    }
}
export default NPC;