import { NgModule }             from '@angular/core';
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Services
import { AuthGuardService } from './services/auth-guard/auth-guard.service';

//Pages
import { LoginPageComponent } from './components/login-page/login-page.component';

          
const appRoutes: Routes = [
  { path: '', component: LoginPageComponent },
];

@NgModule({
    imports: [RouterModule.forChild(appRoutes)],
    exports: [RouterModule]
  })
export class LoginRoutingModule {}