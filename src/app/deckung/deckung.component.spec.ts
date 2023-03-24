import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckungComponent } from './deckung.component';

describe('DeckungComponent', () => {
  let component: DeckungComponent;
  let fixture: ComponentFixture<DeckungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeckungComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeckungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
