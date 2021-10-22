import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClinicalTrialComponent } from './clinical-trial.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([{ path: '', component: ClinicalTrialComponent }]),
  ],
  declarations: [ClinicalTrialComponent]
})
export class ClinicalTrialModule { }
