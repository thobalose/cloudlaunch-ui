import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { LoginPageComponent } from './components/login-page/login-page.component';
import { LoginBoxComponent } from './components/login-box/login-box.component';
import { LayoutModule } from '../shared/layout.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginService } from './services/login/login.service';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { CustomRequestOptions } from './utils/custom-request-options';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    LayoutModule,
    LoginRoutingModule
  ],
  declarations: [LoginPageComponent, LoginBoxComponent],
  providers: [LoginService, AuthGuardService]
})
export class LoginModule { }