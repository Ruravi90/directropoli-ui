import { TestBed } from '@angular/core/testing';

import { RememberGuard } from './remember.guard';

describe('RememberGuard', () => {
  let guard: RememberGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RememberGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
