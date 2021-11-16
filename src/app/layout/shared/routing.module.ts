import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedComponent } from './shared.component';
import { MemberPublicComponent } from '../../public/member/member.component';
import { MembersPublicComponent } from '../../public/members/members.component';



const routes: Routes = [
   {
    path: '',
    component: SharedComponent,
    children: [
      {
        path: 'directory/:code',
        component: MembersPublicComponent,
      },
      {
        path: 'member/:code',
        component: MemberPublicComponent,
      }
    ],
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
