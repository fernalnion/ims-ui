import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { concatMap, map, mergeMap, tap } from 'rxjs/operators';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';
import { AppState } from '../reducers';
import { customersActionTypes } from './customer.actions';

@Injectable()
export class CustomerEffects {
	loadCustomers$ = createEffect(() =>
		this.actions$.pipe(
			ofType(customersActionTypes.loadCustomers),
			mergeMap(() => {
				this.customerStore.dispatch(customersActionTypes.customerProcessLoading());
				return this.customerService.getCustomers();
			}),
			map((customers: Customer[]) => customersActionTypes.customersLoadedSuccessfully({ customers }))
		)
	);

	createCustomer$ = createEffect(() =>
		this.actions$.pipe(
			ofType(customersActionTypes.crearteCustomer),
			mergeMap((action) => {
				this.customerStore.dispatch(customersActionTypes.customerProcessLoading());
				return this.customerService.createCustomer(action.customer);
			}),
			map((customer: Customer) =>
				customersActionTypes.crearteCustomerSuccessfully({
					customer,
				})
			)
		)
	);

	deleteCustomer$ = createEffect(() =>
		this.actions$.pipe(
			ofType(customersActionTypes.deleteCustomer),
			mergeMap((action) => {
				this.customerStore.dispatch(customersActionTypes.customerProcessLoading());
				return this.customerService.deleteCustomer(action.customerid);
			}),
			map((customer: Customer) => {
				return customersActionTypes.deleteCustomerSuccessfully({
					customerid: customer.customerid,
				});
			})
		)
	);

	updateCustomer$ = createEffect(() =>
		this.actions$.pipe(
			ofType(customersActionTypes.updateCustomer),
			mergeMap((action) => {
				this.customerStore.dispatch(customersActionTypes.customerProcessLoading());
				return this.customerService
					.upadteCustomer(action.update.id.toString(), action.update.changes)
					.pipe(map(() => action.update));
			}),
			map((update) => {
				return customersActionTypes.updateCustomerSuccessfully({ update });
			})
		)
	);

	constructor(
		private actions$: Actions,
		private customerService: CustomerService,
		private customerStore: Store<AppState>
	) {}
}
