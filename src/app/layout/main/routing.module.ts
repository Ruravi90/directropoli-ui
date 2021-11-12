import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from '../main/main.component';
import { IndexPrivateComponent } from '../../pages/index/index.component';
import { MemberPrivateComponent } from '../../pages/member/member.component';
import { MembersPrivateComponent } from '../../pages/members/members.component';
import { RegisterCategoryComponent } from '../../pages/form-category/register-category.component';
import { FormDirectoryComponent } from '../../pages/form-directory/form-directory.component';
import { FormMemberComponent } from '../../pages/form-member/form-member.component';
import { ResultSearchComponent } from '../../pages/result-search/result-search.component';
import { SettingComponent } from '../../pages/setting/setting.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'index',
        component: IndexPrivateComponent,
      },
      {
        path: 'member/:id',
        component: MemberPrivateComponent,
      },
      {
        path: 'members/:directoryId',
        component: MembersPrivateComponent,
      },
      {
        path: 'form-category',
        component: RegisterCategoryComponent,
      },
      {
        path: 'form-directory',
        component: FormDirectoryComponent,
      },
      {
        path: 'form-directory/edit/:Id',
        component: FormDirectoryComponent,
      },
      {
        path: 'form-member/:directoryId',
        component: FormMemberComponent,
      },
      {
        path: 'form-member/edit/:Id',
        component: FormMemberComponent,
      },
      {
        path: 'result-search/:shared',
        component: ResultSearchComponent,
      },
      {
        path: 'settings',
        component: SettingComponent,
      },
      {
        path: '**',
        component: IndexPrivateComponent,
      }
    ],
   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
