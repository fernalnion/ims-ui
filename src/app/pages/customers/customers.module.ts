import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerRoutes, CUSTOMER_COMPONENTS } from './customer.routing';

@NgModule({
	imports: [CommonModule, FormsModule, CustomerRoutes],
	declarations: [...CUSTOMER_COMPONENTS],
	exports: [CommonModule],
})
export class CustomersModule {}
