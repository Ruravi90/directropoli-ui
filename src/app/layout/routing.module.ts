import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { CompanyComponent } from '../pages/company/company.component';
import { MemberComponent } from '../pages/member/member.component';
import { RegisterCategoryComponent } from '../pages/register-category/register-category.component';
import { RegisterDirectoryComponent } from '../pages/register-directory/register-directory.component';
import { RegisterMemberComponent } from '../pages/register-member/register-member.component';
import { ResultSearchComponent } from '../pages/result-search/result-search.component';
import { SettingComponent } from '../pages/setting/setting.component';

import { PublicComponent } from './public/public.component';
import { IndexComponent } from '../public/index/index.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'index',
        component: DashboardComponent,
      },
      {
        path: 'company/:id',
        component: CompanyComponent,
      },
      {
        path: 'members/:directoryId',
        component: MemberComponent,
      },
      {
        path: 'register-category',
        component: RegisterCategoryComponent,
      },
      {
        path: 'register-directory',
        component: RegisterDirectoryComponent,
      },
      {
        path: 'register-member/:directoryId',
        component: RegisterMemberComponent,
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
        component: DashboardComponent,
      }
    ],
   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
