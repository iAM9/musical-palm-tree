import { Emotion } from "./emotion";
import { Mood } from "./mood";

export interface IEmotion {
    currentMood: Emotion;
    personality: (stimuli: Emotion) => Emotion;
}