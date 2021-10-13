import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutComponent } from './layout/layout.component';
import { MainRoutingModule } from './main-routing.module';

@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [CommonModule,SharedModule,MainRoutingModule],
  exports:[SharedModule]
})
export class MainModule {}
