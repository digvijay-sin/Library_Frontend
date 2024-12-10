import { TestBed } from '@angular/core/testing';

import { ViewbookService } from './viewbook.service';

describe('ViewbookService', () => {
  let service: ViewbookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewbookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
