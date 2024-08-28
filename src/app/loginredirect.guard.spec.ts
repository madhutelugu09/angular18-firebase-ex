import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { loginredirectGuard } from './loginredirect.guard';

describe('loginredirectGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => loginredirectGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
