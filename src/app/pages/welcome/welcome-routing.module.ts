import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SHARED_ZORRO_MODULES } from 'src/app/ng-zorro-antd.module';
import { WelcomeComponent } from './welcome.component';

const routes: Routes = [{ path: '', component: WelcomeComponent }];

@NgModule({
	imports: [...SHARED_ZORRO_MODULES, RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class WelcomeRoutingModule {}
