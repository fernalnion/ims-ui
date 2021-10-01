import {
	ComponentFactoryResolver,
	CUSTOM_ELEMENTS_SCHEMA,
	Injector,
	NgModule,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutes, APP_COMPONENTS, APP_RESOLVERS } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N, en_US, NZ_DATE_LOCALE } from 'ng-zorro-antd/i18n';
import {
	HashLocationStrategy,
	LocationStrategy,
	registerLocaleData,
} from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { enUS } from 'date-fns/locale';
import { NzConfig, NZ_CONFIG } from 'ng-zorro-antd/core/config';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CoreModule } from './core/core.module';
import { reducers, metaReducers } from './store/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { IconsProviderModule } from './icons-provider.module';
import { SHARED_ZORRO_MODULES } from './ng-zorro-antd.module';
import { GlobalTemplatesComponent } from './global.templates.component';
import { AccountService } from './services/account.service';
import { CustomerService } from './services/customer.service';
import { RouterModule } from '@angular/router';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { TokenService } from './services/token.service';
import {
	authInterceptorProviders,
	errorInterceptorProviders,
	dataInterceptorProviders,
} from './helpers';
import { SupplierService } from './services/supplier.service';

registerLocaleData(en);

const ngZorroConfig: NzConfig = {
	message: { nzTop: 120 },
	notification: { nzTop: 240 },
};

// The Factory function
const nzConfigFactory = (
	injector: Injector,
	resolver: ComponentFactoryResolver
): NzConfig => {
	const factory = resolver.resolveComponentFactory(GlobalTemplatesComponent);
	const { nzIndicator } = factory.create(injector).instance;
	return {
		spin: {
			nzIndicator,
		},
	};
};

export const jwtoptionsfactory = (tokenService: TokenService) => ({
	tokenGetter: () => tokenService.getToken(),
	authScheme: () => '',
	skipWhenExpired: true,
});

const SERVICRES = [AccountService, CustomerService, SupplierService];
@NgModule({
	declarations: [AppComponent, ...APP_COMPONENTS],
	imports: [
		BrowserModule,
		FormsModule,
		HttpClientModule,
		BrowserAnimationsModule,
		CoreModule,
		IconsProviderModule,
		...SHARED_ZORRO_MODULES,

		RouterModule.forRoot([]),
		AppRoutes,
		StoreModule.forRoot(reducers, {
			metaReducers,
			runtimeChecks: {
				strictStateImmutability: true,
				strictActionImmutability: true,
			},
		}),
		EffectsModule.forRoot(),
		StoreDevtoolsModule.instrument({ maxAge: 25 }),
		JwtModule.forRoot({
			jwtOptionsProvider: {
				provide: JWT_OPTIONS,
				useFactory: jwtoptionsfactory,
				deps: [TokenService],
			},
		}),
	],
	providers: [
		{ provide: NZ_I18N, useValue: en_US },
		{ provide: NZ_DATE_LOCALE, useValue: enUS },
		{ provide: NZ_CONFIG, useValue: ngZorroConfig },
		{
			// The FactoryProvider
			provide: NZ_CONFIG,
			useFactory: nzConfigFactory,
			deps: [Injector, ComponentFactoryResolver],
		},
		{
			provide: LocationStrategy,
			useClass: HashLocationStrategy,
		},
		authInterceptorProviders,
		errorInterceptorProviders,
		dataInterceptorProviders,
		...APP_RESOLVERS,
		...SERVICRES,
	],
	bootstrap: [AppComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
