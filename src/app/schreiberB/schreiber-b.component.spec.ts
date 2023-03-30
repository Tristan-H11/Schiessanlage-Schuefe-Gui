import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchreiberBComponent } from './schreiber-b.component';

describe('SchreiberComponent', () => {
  let component: SchreiberBComponent;
  let fixture: ComponentFixture<SchreiberBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchreiberBComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchreiberBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
