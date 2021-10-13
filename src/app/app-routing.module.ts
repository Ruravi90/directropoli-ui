import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent  } from './pages/signin/signin.component';
import { RegisterComponent  } from './pages/register/register.component';
import { LandingComponent  } from './pages/landing/landing.component';

import { AuthGuard } from './auth/auth.guard';
import { RememberGuard } from './auth/remember.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/landing' },
  {
    path: 'signin',
    component: SigninComponent,
    canActivate:[RememberGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate:[RememberGuard]
  },
  {
    path: 'landing', component: LandingComponent,
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./layout/main.module').then(m => m.MainModule),
    canActivate:[AuthGuard]
  },
  {
    path: '**',
    component: LandingComponent,
    canActivate:[RememberGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
