import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuestudentComponent } from './issuestudent.component';

describe('IssuestudentComponent', () => {
  let component: IssuestudentComponent;
  let fixture: ComponentFixture<IssuestudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssuestudentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IssuestudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
