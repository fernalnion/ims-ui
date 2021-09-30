import { Routes, RouterModule } from '@angular/router';
import { GlobalTemplatesComponent } from './global.templates.component';
import { AuthGuard } from './helpers/auth.guard';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import { SecuredLayoutComponent } from './layouts/secured-layout/secured-layout.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebareLeftComponent } from './shared/sidebare-left/sidebare-left.component';
import { CustomerResolver } from './store/customer/customer.resolver';

const routes: Routes = [
	{
		path: '',
		component: SecuredLayoutComponent,
		canActivate: [AuthGuard],
		children: [
			{
				path: 'welcome',
				loadChildren: () =>
					import('./pages/welcome/welcome.module').then((m) => m.WelcomeModule),
			},
			{
				path: 'customers',
				loadChildren: () =>
					import('./pages/customers/customers.module').then((m) => m.CustomersModule),
					resolve : { customers : CustomerResolver}
			},
			{ path: '', pathMatch: 'full', redirectTo: 'welcome' },
		],
	},
	{
		path: 'public',
		component: PublicLayoutComponent,
		loadChildren: () =>
			import('./pages/public/public.module').then((m) => m.PublicModule),
	},
	{ path: '', pathMatch: 'full', redirectTo: 'welcome' },
];

export const APP_COMPONENTS = [
	GlobalTemplatesComponent,
	PublicLayoutComponent,
	SecuredLayoutComponent,

	HeaderComponent,
	FooterComponent,
	SidebareLeftComponent,
];

export const APP_RESOLVERS = [CustomerResolver];
export const AppRoutes = RouterModule.forChild(routes);
