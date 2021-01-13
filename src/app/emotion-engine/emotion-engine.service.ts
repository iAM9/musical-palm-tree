import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmotionEngineService {

  constructor() { }

  
  affects(context: any, newEmotion: any) {
    console.log('Context: ', context);
    console.log('newEmotion: ', newEmotion);
  }
}
