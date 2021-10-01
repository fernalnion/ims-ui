import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, mergeMap } from 'rxjs/operators';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';
import { AppState } from '../reducers';
import { CustomersActionTypes } from './customer.actions';

@Injectable()
export class CustomerEffects {
	loadCustomers$ = createEffect(() =>
		this.actions$.pipe(
			ofType(CustomersActionTypes.loadCustomers),
			mergeMap(() => {
				this.appStore.dispatch(CustomersActionTypes.customerProcessLoading());
				return this.customerService.getCustomers();
			}),
			map((customers: Customer[]) =>
				CustomersActionTypes.LoadedcustomersSuccessfully({ customers })
			)
		)
	);

	createCustomer$ = createEffect(() =>
		this.actions$.pipe(
			ofType(CustomersActionTypes.createCustomer),
			mergeMap((action) => {
				this.appStore.dispatch(CustomersActionTypes.customerProcessLoading());
				return this.customerService.createCustomer(action.customer);
			}),
			map((customer: Customer) =>
				CustomersActionTypes.createCustomerSuccessfully({
					customer,
				})
			)
		)
	);

	deleteCustomer$ = createEffect(() =>
		this.actions$.pipe(
			ofType(CustomersActionTypes.deleteCustomer),
			mergeMap((action) => {
				this.appStore.dispatch(CustomersActionTypes.customerProcessLoading());
				return this.customerService.deleteCustomer(action.customerid);
			}),
			map((customer: Customer) => CustomersActionTypes.deleteCustomerSuccessfully({
					customerid: customer.customerid,
				}))
		)
	);

	updateCustomer$ = createEffect(() =>
		this.actions$.pipe(
			ofType(CustomersActionTypes.updateCustomer),
			mergeMap((action) => {
				this.appStore.dispatch(CustomersActionTypes.customerProcessLoading());
				return this.customerService
					.upadteCustomer(action.update.id.toString(), action.update.changes)
					.pipe(map(() => action.update));
			}),
			map((update) => CustomersActionTypes.updateCustomerSuccessfully({ update }))
		)
	);

	constructor(
		private actions$: Actions,
		private customerService: CustomerService,
		private appStore: Store<AppState>
	) {}
}
