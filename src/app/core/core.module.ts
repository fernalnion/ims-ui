import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SHARED_ZORRO_MODULES } from '../ng-zorro-antd.module';
import { throwIfAlreadyLoaded } from './module-import-guard';

// services
import { SidebarService } from '../services/sidebar.service';

// reducers
import { AuthStateKey, authReducer } from '../store/auth/auth.reducers';
import { customerReducer, customerStateKey } from '../store/customer/customer.reducers';
import { supplierReducer, supplierStateKey } from '../store/supplier/supplier.reducers';

// effects
import { AuthEffects } from '../store/auth/auth.effects';
import { CustomerEffects } from '../store/customer/customer.effects';
import { SupplierEffects } from '../store/supplier/supplier.effects';

const EFFECTS = [AuthEffects, CustomerEffects, SupplierEffects];
const STORECOMPONENTS = [
	StoreModule.forFeature(AuthStateKey, authReducer),
	StoreModule.forFeature(customerStateKey, customerReducer),
	StoreModule.forFeature(supplierStateKey, supplierReducer),
	EffectsModule.forFeature([...EFFECTS]),
];
const SERVICES = [SidebarService];

@NgModule({
	imports: [...STORECOMPONENTS, ...SHARED_ZORRO_MODULES, HttpClientModule],
	declarations: [],
	exports: [],
	providers: [...SERVICES],
})
export class CoreModule {
	constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
		throwIfAlreadyLoaded(parentModule, 'CoreModule');
	}
}
