import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckungAComponent } from './deckung-a.component';

describe('DeckungComponent', () => {
  let component: DeckungAComponent;
  let fixture: ComponentFixture<DeckungAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeckungAComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeckungAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
