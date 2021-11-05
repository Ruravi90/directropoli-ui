import { NgModule } from '@angular/core';
import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public/public.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PublicRoutingModule
  ],
  declarations: [
    PublicComponent,
  ],
  exports: [
    PublicComponent,
  ]
})
export class PublicModule {
 }
