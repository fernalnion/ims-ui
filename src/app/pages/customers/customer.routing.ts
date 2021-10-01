import { Routes, RouterModule } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';

const routes: Routes = [
	{ path: 'list', component: CustomerListComponent },
	{ path: '**', redirectTo: 'list', pathMatch: 'full' },
];

export const CUSTOMER_COMPONENTS = [CustomerListComponent];
export const CustomerRoutes = RouterModule.forChild(routes);
