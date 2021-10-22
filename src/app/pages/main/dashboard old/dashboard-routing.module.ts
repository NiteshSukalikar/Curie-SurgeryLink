import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const appRoutes: Routes = [
  {
    path: '',   
    children: [
      {
        path: 'patient-dashboard',
        loadChildren: () =>
          import('./patient-dashboard/patient-dashboard.module').then(
            (m) => m.PatientDashboardModule
          ),
      },
      {
        path: 'investigator-dashboard',
        loadChildren: () =>
          import('./investigator-dashboard/investigator-dashboard.module').then(
            (m) => m.InvestigatorDashboardModule
          ),
      },
      {
        path: 'clinical-dashboard',
        loadChildren: () =>
          import('./clinical-trial/clinical-trial.module').then(
            (m) => m.ClinicalTrialModule
          ),
      },
      {
        path: 'participation-pool',
        loadChildren: () =>
          import('./participation-pool/participation-pool.module').then(
            (m) => m.ParticipationPoolModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
