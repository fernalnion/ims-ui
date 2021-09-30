import { NgModule } from '@angular/core';
import { SHARED_ZORRO_MODULES } from 'src/app/ng-zorro-antd.module';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from './welcome.component';

@NgModule({
	imports: [WelcomeRoutingModule, ...SHARED_ZORRO_MODULES],
	declarations: [WelcomeComponent],
	exports: [WelcomeComponent],
})
export class WelcomeModule {}
