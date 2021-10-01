import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../reducers';
import { customersActionTypes } from './customer.actions';
import { areCustomersLoaded } from './customer.selectors';
import { filter, first, tap } from 'rxjs/operators';

@Injectable()
export class CustomerResolver implements Resolve<Observable<any>> {
	constructor(private customerStore: Store<AppState>) {}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
		return this.customerStore.pipe(
			select(areCustomersLoaded),
			tap((customersLoaded) => {
				if (!customersLoaded) {
					this.customerStore.dispatch(customersActionTypes.loadCustomers());
				}
			}),
			filter((customersLoaded) => !!customersLoaded),
			first()
		);
	}
}
