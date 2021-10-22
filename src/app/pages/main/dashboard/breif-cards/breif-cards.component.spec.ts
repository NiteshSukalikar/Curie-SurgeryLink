import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreifCardsComponent } from './breif-cards.component';

describe('BreifCardsComponent', () => {
  let component: BreifCardsComponent;
  let fixture: ComponentFixture<BreifCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreifCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreifCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
