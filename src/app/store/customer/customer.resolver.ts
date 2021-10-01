import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../reducers';
import { CustomersActionTypes } from './customer.actions';
import { areCustomersLoaded } from './customer.selectors';
import { filter, first, tap } from 'rxjs/operators';

@Injectable()
export class CustomerResolver implements Resolve<Observable<any>> {
	constructor(private appStore: Store<AppState>) {}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
		return this.appStore.pipe(
			select(areCustomersLoaded),
			tap((customersLoaded) => {
				if (!customersLoaded) {
					this.appStore.dispatch(CustomersActionTypes.loadCustomers());
				}
			}),
			filter((customersLoaded) => !!customersLoaded),
			first()
		);
	}
}
