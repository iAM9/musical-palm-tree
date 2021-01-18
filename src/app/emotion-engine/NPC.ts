import Character from "./Character";
import { Emotion } from "./types/emotion";
import { IEmotion } from "./types/iemotion";
import { Mood } from "./types/mood";

class NPC extends Character {
    /** The current mood of the character */
    currentMood: Emotion;

    /** */
    moodColour: string;

    constructor();
    constructor(initialMood?: Emotion)

    /**
     * Constructor and initialize the mood
     */
    constructor(initialMood?: Emotion) {
        if (initialMood) {
            super(initialMood);
            this.currentMood = initialMood
        } else {
            const mood = {
                anger: 0.0,
                fear: 0.0,
                happiness: 0.0,
                sadness: 0.0
            };
            super(mood);
            this.currentMood = mood;
        }
    }

    /**
     * 
     * @param stimuli The external stimuli that will update the mood of the character
     */
    public personality(stimuli: Emotion): Emotion {
        console.log('This is the personality mapping function OF NPC');
        console.log('Incoming stimuli OF NPC: ', stimuli);

        const maxEmotion = Math.max(
            stimuli.anger,
            stimuli.fear,
            stimuli.happiness,
            stimuli.sadness,
        );

        if (maxEmotion === stimuli.anger) {
            this.moodColour = 'firebrick';
        }
        if (maxEmotion === stimuli.happiness) {
            this.moodColour = 'orange';
        }
        if (maxEmotion === stimuli.sadness) {
            this.moodColour = 'teal';
        }
        if (maxEmotion === stimuli.fear) {
            this.moodColour = 'darkgreen';
        }
        this.currentMood = stimuli;
        return this.currentMood;
    }
}
export default NPC;