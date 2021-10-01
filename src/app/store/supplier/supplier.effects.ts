import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, mergeMap } from 'rxjs/operators';
import { Supplier } from 'src/app/models/supplier.model';
import { SupplierService } from 'src/app/services/supplier.service';
import { AppState } from '../reducers';
import { SuppliersActionTypes } from './supplier.actions';

@Injectable()
export class SupplierEffects {
	loadSuppliers$ = createEffect(() =>
		this.actions$.pipe(
			ofType(SuppliersActionTypes.loadSuppliers),
			mergeMap(() => {
				this.appStore.dispatch(SuppliersActionTypes.supplierProcessLoading());
				return this.suppliersService.getSuppliers();
			}),
			map((suppliers: Supplier[]) =>
				SuppliersActionTypes.loadedSuppliersSuccessfully({ suppliers })
			)
		)
	);

	createSupplier$ = createEffect(() =>
		this.actions$.pipe(
			ofType(SuppliersActionTypes.createSupplier),
			mergeMap((action) => {
				this.appStore.dispatch(SuppliersActionTypes.supplierProcessLoading());
				return this.suppliersService.createSupplier(action.supplier);
			}),
			map((supplier: Supplier) =>
				SuppliersActionTypes.createSupplierSuccessfully({ supplier })
			)
		)
	);

	updateSupplier$ = createEffect(() =>
		this.actions$.pipe(
			ofType(SuppliersActionTypes.updateSupplier),
			mergeMap((action) => {
				this.appStore.dispatch(SuppliersActionTypes.supplierProcessLoading());
				return this.suppliersService
					.upadteSupplier(action.update.id.toString(), action.update.changes)
					.pipe(map(() => action.update));
			}),
			map((update) => SuppliersActionTypes.updateSupplierSuccessfully({ update }))
		)
	);

	deleteSupplier$ = createEffect(() =>
		this.actions$.pipe(
			ofType(SuppliersActionTypes.deleteSupplier),
			mergeMap((action) => {
				this.appStore.dispatch(SuppliersActionTypes.supplierProcessLoading());
				return this.suppliersService.deleteSupplier(action.supplierid);
			}),
			map((supplier: Supplier) =>
				SuppliersActionTypes.deleteSupplierSuccessfully({
					supplierid: supplier.supplierid,
				})
			)
		)
	);

	constructor(
		private actions$: Actions,
		private suppliersService: SupplierService,
		private appStore: Store<AppState>
	) {}
}
