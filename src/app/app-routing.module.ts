import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent  } from './pages/signin/signin.component';
import { RegisterComponent  } from './pages/register/register.component';
import { LandingComponent  } from './pages/landing/landing.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/landing' },
  {
    path: 'signin', component: SigninComponent,
  },
  {
    path: 'register', component: RegisterComponent,
  },
  {
    path: 'landing', component: LandingComponent,
  },
  {
    path: 'dashboard', loadChildren: () => import('./layout/main.module').then(m => m.MainModule)
  },
  { path: '**', component: LandingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
