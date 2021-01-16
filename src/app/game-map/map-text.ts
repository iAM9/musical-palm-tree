import { Emotion } from "app/emotion-engine/types/emotion";

export interface MapText {
    mapLocation: number;
    text: string;
    dialogue: Dialogue[];
    stimuli: Emotion;
}

export interface Dialogue {
    option: number;
    txt: string;
}