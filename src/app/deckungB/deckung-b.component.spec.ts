import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckungBComponent } from './deckung-b.component';

describe('DeckungComponent', () => {
  let component: DeckungBComponent;
  let fixture: ComponentFixture<DeckungBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeckungBComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeckungBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
