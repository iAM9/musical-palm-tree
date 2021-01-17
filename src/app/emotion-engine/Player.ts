import Character from "./Character";
import { Emotion } from "./types/emotion";
import { IEmotion } from "./types/iemotion";
import { Mood } from "./types/mood";

export class Player extends Character {
    /** The current mood of the character */
    currentMood: Emotion;

    textAnimation: string;

    moodColour: string;

    /**
     * Constructor and initialize the mood
     */
    constructor(initialMood: Emotion) {
        super(initialMood);

        const maxColourAmt = Math.max(
            this.currentMood.anger,
            this.currentMood.fear,
            this.currentMood.happiness,
            this.currentMood.sadness,
        );

        if (maxColourAmt === this.currentMood.anger) {
            this.moodColour = 'firebrick';
            this.textAnimation = 'shake-hard shake-constant';
        }
        if (maxColourAmt === this.currentMood.happiness) {
            this.moodColour = 'orange';
            this.textAnimation = 'shake-slow shake-constant';
        }
        if (maxColourAmt === this.currentMood.sadness) {
            this.moodColour = 'teal';
            this.textAnimation = '';
        }
        if (maxColourAmt === this.currentMood.fear) {
            this.moodColour = 'darkgreen';
            this.textAnimation = 'shake-opacity shake-constant';
        }
    }

    /**
     * 
     * @param stimuli The external stimuli that will update the mood of the character
     */
    public personality(stimuli: Emotion): Emotion {
        console.log('This is the personality mapping function OF the MAIN PLAYER');
        console.log('Incoming stimuli OF the MAIN PLAYER: ', stimuli);
        if (stimuli.anger === 0 &&
            stimuli.fear === 0 &&
            stimuli.happiness === 0 &&
            stimuli.sadness === 0) {
            console.log('asdasd');
            
            const maxColourAmt = Math.max(
                this.currentMood.anger,
                this.currentMood.fear,
                this.currentMood.happiness,
                this.currentMood.sadness,
            );
    
            if (maxColourAmt === this.currentMood.anger) {
                this.moodColour = 'firebrick';
                this.textAnimation = 'shake-hard shake-constant';
            }
            if (maxColourAmt === this.currentMood.happiness) {
                this.moodColour = 'orange';
                this.textAnimation = 'shake-slow shake-constant';
            }
            if (maxColourAmt === this.currentMood.sadness) {
                this.moodColour = 'teal';
                this.textAnimation = '';
            }
            if (maxColourAmt === this.currentMood.fear) {
                this.moodColour = 'darkgreen';
                this.textAnimation = 'shake-opacity shake-constant';
            }

            return this.currentMood;
        }
        this.currentMood = stimuli;

        const maxColourAmt = Math.max(
            this.currentMood.anger,
            this.currentMood.fear,
            this.currentMood.happiness,
            this.currentMood.sadness,
        );

        if (maxColourAmt === this.currentMood.anger) {
            this.moodColour = 'firebrick';
            this.textAnimation = 'shake-hard shake-constant';
        }
        if (maxColourAmt === this.currentMood.happiness) {
            this.moodColour = 'orange';
            this.textAnimation = 'shake-slow shake-constant';
        }
        if (maxColourAmt === this.currentMood.sadness) {
            this.moodColour = 'teal';
            this.textAnimation = '';
        }
        if (maxColourAmt === this.currentMood.fear) {
            this.moodColour = 'darkgreen';
            this.textAnimation = 'shake-opacity shake-constant';
        }

        return this.currentMood;
    }

}

// function _setPlayerVisualAttributes() {
//     console.log('setting VIZ OF the MAIN PLAYER');
//     const maxColourAmt = Math.max(
//         this.currentMood.anger,
//         this.currentMood.fear,
//         this.currentMood.happiness,
//         this.currentMood.sadness,
//     );

//     if (maxColourAmt === this.currentMood.anger) {
//         this.moodColour = 'firebrick';
//         this.textAnimation = 'shake-hard'
//     }
//     if (maxColourAmt === this.currentMood.happiness) {
//         this.moodColour = 'orange';
//         this.textAnimation = "shake-slow";
//     }
//     if (maxColourAmt === this.currentMood.sadness) {
//         this.moodColour = 'teal';
//         this.textAnimation = '';
//     }
//     if (maxColourAmt === this.currentMood.fear) {
//         this.moodColour = 'darkgreen';
//         this.textAnimation = "shake-opacity";
//     }
// }