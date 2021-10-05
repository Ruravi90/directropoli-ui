import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { MainComponent } from './main/main.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { CompanyComponent } from '../pages/company/company.component';
import { MemberComponent } from '../pages/member/member.component';
import { RegisterCategoryComponent } from '../pages/register-category/register-category.component';
import { RegisterDirectoryComponent } from '../pages/register-directory/register-directory.component';
import { RegisterMemberComponent } from '../pages/register-member/register-member.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate:[AuthGuard],
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
    ],
   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
