import { ComponentFactoryResolver, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N, en_US, NZ_DATE_LOCALE } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { enUS } from 'date-fns/locale';
import { NzConfig, NZ_CONFIG } from 'ng-zorro-antd/core/config';
import { GlobalTemplatesComponent } from './global.templates.component';

registerLocaleData(en);

const ngZorroConfig: NzConfig = {
	message: { nzTop: 120 },
	notification: { nzTop: 240 },
};

// The Factory function
const nzConfigFactory = (injector: Injector, resolver: ComponentFactoryResolver): NzConfig => {
	const factory = resolver.resolveComponentFactory(GlobalTemplatesComponent);
	const { nzIndicator } = factory.create(injector).instance;
	return {
		spin: {
			nzIndicator,
		},
	};
};

@NgModule({
	declarations: [AppComponent, GlobalTemplatesComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		HttpClientModule,
		BrowserAnimationsModule,
		IconsProviderModule,
		NzLayoutModule,
		NzMenuModule,
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
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
