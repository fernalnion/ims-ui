import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SuppliersRoutes, SUPPLIER_COMPONENTS } from './suppliers.routing';
import { SHARED_ZORRO_MODULES } from 'src/app/ng-zorro-antd.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		SuppliersRoutes,
		SHARED_ZORRO_MODULES,
	],
	declarations: [...SUPPLIER_COMPONENTS],
	exports: [CommonModule],
})
export class SuppliersModule {}
