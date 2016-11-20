import { NgModule }             from '@angular/core';
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Services
import { AuthGuardService } from '../login/services/auth-guard/auth-guard.service';

//Pages
import { MyAppliancesPageComponent } from './components/my-appliances-page/my-appliances-page.component';

          
const appRoutes: Routes = [
  { path: '', component: MyAppliancesPageComponent, canActivate: [AuthGuardService] },
];

@NgModule({
    imports: [RouterModule.forChild(appRoutes)],
    exports: [RouterModule]
  })
export class MyAppliancesRoutingModule {}