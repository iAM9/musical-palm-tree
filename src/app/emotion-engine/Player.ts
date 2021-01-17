import Character from "./Character";
import { Emotion } from "./types/emotion";
import { IEmotion } from "./types/iemotion";
import { Mood } from "./types/mood";

export class Player extends Character {
    /** The current mood of the character */
    currentMood: Emotion;

    textAnimation: string;

    moodColour: string;

    moodText: string;

    /**
     * Constructor and initialize the mood
     */
    constructor(initialMood: Emotion) {
        super(initialMood);
        this.currentMood = initialMood;

        Player._setPlayerVisualAttributes(this);
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

            Player._setPlayerVisualAttributes(this);

            return this.currentMood;
        }

        Player._personalityFunction(stimuli, this);

        return this.currentMood;
    }

    /////////////////////////////////////////////////////////
    ////////////////////////////////
    private static _personalityFunction(stimuli: Emotion, player: Player) {
        // if (stimuli.sadness >= 0.5 && stimuli.happiness >= 0.5 && stimuli.fear < 0.5 && stimuli.anger < 0.5) {
        //     this.currentMood.sadness -= 0.2;
        //     this.currentMood.happiness -= 0.2;
        //     this.currentMood.anger += 0.2;
        //     this.currentMood.fear += 0.2;
        // } else if (stimuli.fear >= 0.5 && stimuli.anger >= 0.5 && stimuli.sadness < 0.5 && stimuli.happiness < 0.5) {
        //     this.currentMood.anger -= 0.2;
        //     this.currentMood.fear -= 0.2;
        //     this.currentMood.sadness += 0.2;
        //     this.currentMood.happiness += 0.2;
        // } else if (stimuli.sadness >= 0.5 && stimuli.fear >= 0.5 && stimuli.anger < 0.5 && stimuli.happiness < 0.5) {
        //     this.currentMood.sadness -= 0.2;
        //     this.currentMood.fear -= 0.2;
        //     this.currentMood.anger += 0.2;
        //     this.currentMood.happiness += 0.2;
        // } else if (stimuli.anger >= 0.5 && stimuli.happiness >= 0.5 && stimuli.sadness < 0.5 && stimuli.fear < 0.5) {
        //     this.currentMood.anger -= 0.2;
        //     this.currentMood.happiness -= 0.2;
        //     this.currentMood.sadness += 0.2;
        //     this.currentMood.fear += 0.2;
        // } else if (stimuli.fear >= 0.5 && stimuli.happiness >= 0.5 && stimuli.sadness < 0.5 && stimuli.anger < 0.5) {
        //     this.currentMood.happiness += 0.2;
        //     this.currentMood.fear += 0.2;
        // } else if (stimuli.sadness >= 0.5 && stimuli.anger >= 0.5 && stimuli.fear < 0.5 && stimuli.happiness < 0.5) {
        //     this.currentMood.fear += 0.2;
        //     this.currentMood.anger += 0.2;
        // } else if (stimuli.happiness >= 0.5) {
        //     this.currentMood.fear += 0.5;
        // }
        console.error('PLAYER MOOD BEFORE: ', player.currentMood);
        if (stimuli.happiness >= 0.5) {
            player.currentMood.fear = 1;
            player.currentMood.anger -= 0.05;
            player.currentMood.happiness -= 0.5;
            player.currentMood.sadness += 0.02;
        } else if (stimuli.happiness < 0.5) {
            player.currentMood.fear -= 0.05;
            player.currentMood.anger += 0.05;
            player.currentMood.sadness -= 0.05;
            player.currentMood.happiness += 0.05;
        }

        if (stimuli.anger >= 0.5) {
            player.currentMood.happiness += 0.2;
            player.currentMood.anger += 0.05;
            player.currentMood.fear -= 0.1;
            player.currentMood.sadness -= 0.1;
        } else if (stimuli.anger < 0.5) {
            player.currentMood.sadness += 0.3;
            player.currentMood.fear -= 0.05;
            player.currentMood.anger += 0.05;
            player.currentMood.happiness += 0.05;
        }

        if (stimuli.sadness >= 0.5) {
            player.currentMood.sadness += 0.05;
            player.currentMood.happiness += 0.1;
            player.currentMood.fear -= 0.5;
            player.currentMood.anger -= 0.05;
        } else if (stimuli.sadness < 0.5) {
            player.currentMood.sadness += 0.05;
            player.currentMood.fear -= 0.05;
            player.currentMood.anger -= 0.05;
            player.currentMood.happiness += 0.05;
        }

        if (stimuli.fear >= 0.5) {
            player.currentMood.anger += 0.1;
            player.currentMood.happiness += 0.23;
            player.currentMood.sadness -= 0.2;
            player.currentMood.fear = 0;
        } else if (stimuli.fear < 0.5) {
            player.currentMood.fear += 0.4;
            player.currentMood.sadness += 0.05;
            player.currentMood.anger -= 0.05;
            player.currentMood.happiness += 0.05;
        }

        // this.currentMood = stimuli;
        console.error('PLAYER MOOD AFTER: ', player.currentMood);
        Player._setPlayerVisualAttributes(player);
    }


    private static _setPlayerVisualAttributes(player: Player) {
        console.log('STATIC!!!!');
        const maxColourAmt = Math.max(
            player.currentMood.anger,
            player.currentMood.fear,
            player.currentMood.happiness,
            player.currentMood.sadness,
        );

        if (maxColourAmt === player.currentMood.anger) {
            player.moodColour = 'firebrick';
            player.textAnimation = 'shake shake-constant';
            player.moodText = 'Anger';
            if (player.currentMood.anger > 0.7) {
                player.moodText = 'Rage';
            }
        }
        if (maxColourAmt === player.currentMood.happiness) {
            player.moodColour = 'orange';
            player.textAnimation = 'shake-slow shake-constant';
            player.moodText = 'Happiness';
            if (player.currentMood.happiness > 0.7) {
                player.moodText = 'Ecstasy';
            }
        }
        if (maxColourAmt === player.currentMood.sadness) {
            player.moodColour = 'teal';
            player.textAnimation = '';
            player.moodText = 'Sadness';
            if (player.currentMood.sadness > 0.7) {
                player.moodText = 'Depression';
            }
        }
        if (maxColourAmt === player.currentMood.fear) {
            player.moodColour = 'darkgreen';
            player.textAnimation = 'shake-opacity shake-constant';
            player.moodText = 'Fear';
            if (player.currentMood.fear > 0.7) {
                player.moodText = 'Paralysis from Fear';
            }
        }
    }

}


// function _setPlayerVisualAttributes(): void {
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