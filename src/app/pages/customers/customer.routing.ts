import { Routes, RouterModule } from '@angular/router';
import { CreateCustomersComponent } from './create-customers/create-customers.component';
import { CustomerListComponent } from './customer-list/customer-list.component';

const routes: Routes = [
	{ path: 'list', component: CustomerListComponent },
	{ path: 'create', component: CreateCustomersComponent },
	{ path: '**', redirectTo: 'list', pathMatch: 'full' },
];

export const CUSTOMER_COMPONENTS = [CustomerListComponent, CreateCustomersComponent];
export const CustomerRoutes = RouterModule.forChild(routes);
