import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParticipationPoolComponent } from './participation-pool.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([{ path: '', component: ParticipationPoolComponent }]),
  ],
  declarations: [ParticipationPoolComponent]
})
export class ParticipationPoolModule { }
