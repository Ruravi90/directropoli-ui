import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { MainModule } from './layout/main/main.module';
import { PublicModule } from './layout/public/public.module';


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
import { RegisterCategoryComponent } from './pages/form-category/register-category.component';
import { MembersPrivateComponent } from './pages/members/members.component';
import { FormMemberComponent } from './pages/form-member/form-member.component';
import { MemberPrivateComponent } from './pages/member/member.component';
import { IndexPrivateComponent } from './pages/index/index.component';
import { FormDirectoryComponent } from './pages/form-directory/form-directory.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { ResultSearchComponent } from './pages/result-search/result-search.component';
import { SettingComponent } from './pages/setting/setting.component';

import { IndexPublicComponent } from './public/index/index.component';
import { MembersPublicComponent } from './public/members/members.component';
import { MemberPublicComponent } from './public/member/member.component';

import { ClipboardModule } from '@angular/cdk/clipboard';
import { SharedModule } from './layout/shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    RegisterComponent,
    LandingComponent,
    RegisterCategoryComponent,
    MembersPrivateComponent,
    FormMemberComponent,
    MemberPrivateComponent,
    IndexPrivateComponent,
    FormDirectoryComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,
    ResultSearchComponent,
    SettingComponent,
    IndexPublicComponent,
    MembersPublicComponent,
    MemberPublicComponent
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
    ClipboardModule,
    ImageCropperModule,
    MainModule,
    PublicModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    SharedModule
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
