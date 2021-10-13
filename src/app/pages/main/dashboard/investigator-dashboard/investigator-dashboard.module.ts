import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvestigatorDashboardComponent } from './investigator-dashboard.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([{ path: '', component: InvestigatorDashboardComponent }]),
    
  ],
  declarations: [InvestigatorDashboardComponent]
})
export class InvestigatorDashboardModule { }
