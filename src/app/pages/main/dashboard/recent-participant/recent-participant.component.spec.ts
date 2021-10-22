import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentParticipantComponent } from './recent-participant.component';

describe('RecentParticipantComponent', () => {
  let component: RecentParticipantComponent;
  let fixture: ComponentFixture<RecentParticipantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentParticipantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
