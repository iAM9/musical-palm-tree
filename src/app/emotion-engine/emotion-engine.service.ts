import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Context } from './types/context';

import { Emotion } from './types/emotion';

@Injectable({
  providedIn: 'root',
})
export class EmotionEngineService {

  constructor() { }

  /**
   * 
   * @param context The current mood and the personality mapping function of the object
   * @param newStimuli Incoming affective emotional stimuli
   */
  affects(context: Context, newStimuli: Emotion): Observable<Emotion> {
    // tslint:disable-next-line: no-console
    console.log('Context: ', context);
    // tslint:disable-next-line: no-console
    console.log('newEmotion: ', newStimuli);
    const emotion = context.personality(newStimuli);
    return of(emotion);
  }
}
