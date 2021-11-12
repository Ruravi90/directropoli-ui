import { NgModule } from '@angular/core';
import { MainRoutingModule } from './routing.module';
import { MainComponent } from './main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MainRoutingModule
  ],
  declarations: [
    MainComponent,
  ],
  exports: [
    MainComponent,
  ]
})
export class MainModule {
 }
