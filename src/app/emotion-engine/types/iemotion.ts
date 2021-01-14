import { Emotion } from "./emotion";
import { Mood } from "./mood";

export interface IEmotion {
    mood: Mood;
    personality(stimuli: Emotion): Mood;
}