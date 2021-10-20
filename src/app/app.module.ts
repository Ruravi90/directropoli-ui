import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { MainModule } from './layout/main.module';


import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { es_ES } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { BasicAuthInterceptor } from './service/BasicAuthInterceptor';

import { IconsProviderModule } from './icons-provider.module';
import { NgZorroAntdModule } from './NgZorroAntdModule.module';

import { FontAwesomeModule ,FaIconLibrary } from '@fortawesome/angular-fontawesome';

import { ImageCropperModule } from 'ngx-image-cropper';

registerLocaleData(es);


import { SigninComponent  } from './pages/signin/signin.component';
import { RegisterComponent  } from './pages/register/register.component';
import { LandingComponent  } from './pages/landing/landing.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { RegisterCategoryComponent } from './pages/register-category/register-category.component';
import { MemberComponent } from './pages/member/member.component';
import { RegisterMemberComponent } from './pages/register-member/register-member.component';
import { CompanyComponent } from './pages/company/company.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegisterDirectoryComponent } from './pages/register-directory/register-directory.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { ResultSearchComponent } from './pages/result-search/result-search.component';
import { SharedDirectoryComponent } from './pages/shared-directory/shared-directory.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    RegisterComponent,
    LandingComponent,
    RegisterCategoryComponent,
    MemberComponent,
    RegisterMemberComponent,
    CompanyComponent,
    DashboardComponent,
    RegisterDirectoryComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,
    ResultSearchComponent,
    SharedDirectoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    FontAwesomeModule,
    NgZorroAntdModule,
    ImageCropperModule,
    MainModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [{
    provide: NZ_I18N,
    useValue: es_ES,
    },
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    // Add an icon to the library for convenient access in other components
    //library.addIcons(faWhatsapp);
  }
 }
