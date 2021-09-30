import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { SHARED_ZORRO_MODULES } from 'src/app/ng-zorro-antd.module';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		...SHARED_ZORRO_MODULES,
		RouterModule.forChild(routes),
	],
	declarations: [LoginComponent],
	exports: [RouterModule, LoginComponent],
})
export class PubliceRoutingModule {}
