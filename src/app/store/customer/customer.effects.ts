import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, concatMap, map, mergeMap, tap } from 'rxjs/operators';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';
import { customersActionTypes } from './customer.actions';

@Injectable()
export class CustomerEffects {
	loadCustomers$ = createEffect(() =>
		this.actions$.pipe(
			ofType(customersActionTypes.loadCustomers),
			concatMap(() => this.customerService.getCustomers()),
			map((customers: any) =>
				customersActionTypes.customersLoaded({ customers: customers.data })
			)
		)
	);

	createCustomer$ = createEffect(() =>
		this.actions$.pipe(
			ofType(customersActionTypes.crearteCustomer),
			mergeMap((action) => this.customerService.createCustomer(action.customer)),
			map((customer: any) =>
				customersActionTypes.crearteCustomerSuccessfully({
					customer: customer.data,
				})
			)
		)
	);

	deleteCustomer$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(customersActionTypes.deleteCustomer),
				mergeMap((action) => this.customerService.deleteCustomer(action.customerid)),
				map((customerid: any) =>
					customersActionTypes.deleteCustomerSuccessfully({ customerid })
				)
			),
		{ dispatch: false }
	);

	updateCustomer$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(customersActionTypes.updateCustomer),
				mergeMap((action) =>
					this.customerService.upadteCustomer(
						action.update.id.toString(),
						action.update.changes
					)
				),
				map((update: any) => customersActionTypes.updateCustomerSuccessfully({ update }))
			),
		{ dispatch: false }
	);

	constructor(
		private actions$: Actions,
		private customerService: CustomerService,
		private router: Router
	) {}
}
