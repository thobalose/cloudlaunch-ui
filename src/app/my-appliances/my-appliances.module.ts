import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { LayoutModule } from '../shared/layout.module';
import { MyAppliancesRoutingModule } from './my-appliances-routing.module';

// Components
import { DeploymentsComponent } from './components/deployments/deployments.component';
import { MyAppliancesPageComponent } from './components/my-appliances-page/my-appliances-page.component';

// Services
import { DeploymentService } from '../shared/services/deployment.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        LayoutModule,
        ClipboardModule,
        MyAppliancesRoutingModule
    ],
    declarations: [MyAppliancesPageComponent, DeploymentsComponent],
    providers: [DeploymentService]
})
export class MyAppliancesModule { }
