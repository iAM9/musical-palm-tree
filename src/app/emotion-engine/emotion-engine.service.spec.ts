import { TestBed } from '@angular/core/testing';

import { EmotionEngineService } from './emotion-engine.service';

describe('EmotionEngineService', () => {
  let service: EmotionEngineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmotionEngineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
