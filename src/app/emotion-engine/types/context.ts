import { Emotion } from "./emotion";
import { Mood } from "./mood";

export interface Context {
    currentMood: Emotion;
    personality: (stimuli: Emotion) => Emotion;
}