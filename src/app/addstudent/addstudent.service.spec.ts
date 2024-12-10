import { TestBed } from '@angular/core/testing';

import { AddstudentService } from './addstudent.service';

describe('AddstudentService', () => {
  let service: AddstudentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddstudentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
