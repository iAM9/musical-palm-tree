import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Context } from './types/context';

import { Emotion } from './types/emotion';

@Injectable({
  providedIn: 'root'
})
export class EmotionEngineService {

  constructor() { }

  /**
   * 
   * @param context 
   * @param newStimuli 
   */
  affects(context: Context, newStimuli: Emotion): Observable<Emotion> {
    console.log('Context: ', context);
    console.log('newEmotion: ', newStimuli);
    const emotion = context.personality(newStimuli);
    return of(emotion);
  }
}
