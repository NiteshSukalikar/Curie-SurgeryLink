import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recent-participant',
  templateUrl: './recent-participant.component.html',
  styleUrls: ['./recent-participant.component.scss'],
})
export class RecentParticipantComponent implements OnInit {
  tempItem = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  constructor() {}

  ngOnInit(): void {}
}
