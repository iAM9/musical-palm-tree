import { Emotion } from './emotion';
import { Mood } from './mood';

// tslint:disable-next-line: interface-name
export interface Context {
  currentMood: Emotion;
  personality: (stimuli: Emotion) => Emotion;
}