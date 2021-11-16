import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedComponent } from './shared.component';
import { SharedRoutingModule } from './routing.module';

@NgModule({
  declarations: [
    SharedComponent,
  ],
  exports: [
    SharedComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ]
})
export class SharedModule { }
