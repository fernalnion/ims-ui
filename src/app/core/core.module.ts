import { NgModule, Optional, SkipSelf } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SHARED_ZORRO_MODULES } from '../ng-zorro-antd.module';
import { throwIfAlreadyLoaded } from './module-import-guard';

// services
import { SidebarService } from '../services/sidebar.service';

// reducers
import { AuthStateKey, authReducer } from '../store/auth/auth.reducers';
import { customerReducer, customerStateKey } from '../store/customer/customer.reducers';

// effects
import { AuthEffects } from '../store/auth/auth.effects';
import { CustomerEffects } from '../store/customer/customer.effects';
import { HttpClientModule } from '@angular/common/http';

const EFFECTS = [AuthEffects, CustomerEffects];
const STORECOMPONENTS = [
	StoreModule.forFeature(AuthStateKey, authReducer),
	StoreModule.forFeature(customerStateKey, customerReducer),
	EffectsModule.forFeature([...EFFECTS]),
];
const SERVICES = [SidebarService];

@NgModule({
	imports: [
		...STORECOMPONENTS, 
		...SHARED_ZORRO_MODULES,
		HttpClientModule,
	],
	declarations: [],
	exports: [],
	providers: [...SERVICES],
})
export class CoreModule {
	constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
		throwIfAlreadyLoaded(parentModule, 'CoreModule');
	}
}
