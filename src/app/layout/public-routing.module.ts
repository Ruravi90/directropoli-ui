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
    component: PublicComponent,
    children: [
      {
        path: 'index',
        component: IndexComponent,
      },
      {
        path: '**',
        component: IndexComponent,
      }
    ],
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
