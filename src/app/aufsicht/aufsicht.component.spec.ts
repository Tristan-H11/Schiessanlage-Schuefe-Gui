import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AufsichtComponent } from './aufsicht.component';

describe('AufsichtComponent', () => {
  let component: AufsichtComponent;
  let fixture: ComponentFixture<AufsichtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AufsichtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AufsichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
