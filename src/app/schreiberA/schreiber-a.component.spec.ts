import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchreiberAComponent } from './schreiber-a.component';

describe('SchreiberComponent', () => {
  let component: SchreiberAComponent;
  let fixture: ComponentFixture<SchreiberAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchreiberAComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchreiberAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
