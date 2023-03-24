import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchreiberComponent } from './schreiber.component';

describe('SchreiberComponent', () => {
  let component: SchreiberComponent;
  let fixture: ComponentFixture<SchreiberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchreiberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchreiberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
