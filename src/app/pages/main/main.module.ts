import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutComponent } from './layout/layout.component';
import { MainRoutingModule } from './main-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BreifCardsComponent } from './dashboard/breif-cards/breif-cards.component';
import { RecentParticipantComponent } from './dashboard/recent-participant/recent-participant.component';

@NgModule({
  declarations: [LayoutComponent, DashboardComponent, BreifCardsComponent, RecentParticipantComponent],
  imports: [
    CommonModule,
    SharedModule,
    MainRoutingModule,
    BsDropdownModule.forRoot(),
  ],
  exports: [SharedModule],
})
export class MainModule {}
