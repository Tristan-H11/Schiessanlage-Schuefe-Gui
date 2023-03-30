import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchreiberCComponent } from './schreiber-c.component';

describe('SchreiberComponent', () => {
  let component: SchreiberCComponent;
  let fixture: ComponentFixture<SchreiberCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchreiberCComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchreiberCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
