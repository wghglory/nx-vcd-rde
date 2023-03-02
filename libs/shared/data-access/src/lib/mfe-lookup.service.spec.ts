import { TestBed } from '@angular/core/testing';
import { SharedSpecModule } from '@seed/shared/module';

import { MfeLookupService } from './mfe-lookup.service';

describe('MfeLookupService', () => {
  let service: MfeLookupService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [SharedSpecModule] });
    service = TestBed.inject(MfeLookupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
