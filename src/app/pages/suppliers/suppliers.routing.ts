import { Routes, RouterModule } from '@angular/router';
import { SupplierListComponent } from './supplier-list/supplier-list.component';

const routes: Routes = [
	{ path: 'list', component: SupplierListComponent },
	{ path: '**', redirectTo: 'list', pathMatch: 'full' },
];

export const SuppliersRoutes = RouterModule.forChild(routes);

export const SUPPLIER_COMPONENTS = [SupplierListComponent];
