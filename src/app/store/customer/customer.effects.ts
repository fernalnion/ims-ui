import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map, tap } from 'rxjs/operators';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';
import { customersActionTypes } from './customer.actions';

@Injectable()
export class CustomerEffects {
	loadCustomers$ = createEffect(() =>
		this.actions$.pipe(
			ofType(customersActionTypes.loadCustomers),
			concatMap(() => this.customerService.getCustomers()),
			map((customers:any) => customersActionTypes.customersLoaded({ customers : customers.data }))
		)
	);

	createCustomer$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(customersActionTypes.crearteCustomer),
				concatMap((action) => this.customerService.createCustomer(action.customer)),
				tap(() => this.router.navigateByUrl('/customers'))
			),
		{ dispatch: false }
	);

	deleteCustomer$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(customersActionTypes.deleteCustomer),
				concatMap((action) => this.customerService.deleteCustomer(action.customerid))
			),
		{ dispatch: false }
	);

	updateCustomer$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(customersActionTypes.updateCustomer),
				concatMap((action) =>
					this.customerService.upadteCustomer(
						action.update.id.toString(),
						action.update.changes
					)
				)
			),
		{ dispatch: false }
	);

	constructor(
		private actions$: Actions,
		private customerService: CustomerService,
		private router: Router
	) {}
}
