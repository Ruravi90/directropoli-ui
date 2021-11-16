import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublicComponent } from '../public/public.component';
import { IndexPublicComponent } from '../../public/index/index.component';
import { MemberPublicComponent } from '../../public/member/member.component';
import { MembersPublicComponent } from '../../public/members/members.component';
import { FormMemberComponent } from '../../pages/form-member/form-member.component';


const routes: Routes = [
   {
    path: '',
    component: PublicComponent,
    children: [
      {
        path: 'index',
        component: IndexPublicComponent,
      },
      {
        path: 'members/:directoryId',
        component: MembersPublicComponent,
      },
      {
        path: 'member/:id',
        component: MemberPublicComponent,
      },
      {
        path: 'invitation/:code',
        component: MembersPublicComponent,
      },
      {
        path: 'card-shared/:code',
        component: MemberPublicComponent,
      },
      {
        path: 'form-member/:type/:code/:directoryId',
        component: FormMemberComponent,
      },
      {
        path: '**',
        component: IndexPublicComponent,
      }
    ],
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
