import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../reducers';
import { SuppliersActionTypes } from './supplier.actions';
import { areSuppliersLoaded } from './supplier.selectors';
import { filter, first, tap } from 'rxjs/operators';

@Injectable()
export class SupplierResolver implements Resolve<Observable<any>> {
	constructor(private appStore: Store<AppState>) {}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
		return this.appStore.pipe(
			select(areSuppliersLoaded),
			tap((suppliersLoaded) => {
				if (!suppliersLoaded) {
					this.appStore.dispatch(SuppliersActionTypes.loadSuppliers());
				}
			}),
			filter((suppliersLoaded) => !!suppliersLoaded),
			first()
		);
	}
}
