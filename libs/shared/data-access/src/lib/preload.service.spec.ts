import { TestBed } from '@angular/core/testing';
import { ClrCommonStringsService } from '@clr/angular';
import { SharedVipSpecModule } from '@seed/shared/vip';

import { AuthGuard } from './auth.guard';
import { PreloadService } from './preload.service';

describe('PreloadService', () => {
  let service: PreloadService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard, ClrCommonStringsService],
      imports: [SharedVipSpecModule],
    });
    service = TestBed.inject(PreloadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
