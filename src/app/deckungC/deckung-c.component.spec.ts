import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckungCComponent } from './deckung-c.component';

describe('DeckungComponent', () => {
  let component: DeckungCComponent;
  let fixture: ComponentFixture<DeckungCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeckungCComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeckungCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
