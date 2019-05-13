import { TestBed } from '@angular/core/testing';

import { ExtensionsService } from './extensions.service';

describe('ExtensionsServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExtensionsService = TestBed.get(ExtensionsService);
    expect(service).toBeTruthy();
  });
});
