import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerRoutes, CUSTOMER_COMPONENTS } from './customer.routing';
import { SHARED_ZORRO_MODULES } from 'src/app/ng-zorro-antd.module';

@NgModule({
	imports: [CommonModule, FormsModule, ReactiveFormsModule, CustomerRoutes, SHARED_ZORRO_MODULES],
	declarations: [...CUSTOMER_COMPONENTS],
	exports: [CommonModule],
})
export class CustomersModule {}
