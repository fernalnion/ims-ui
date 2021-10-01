import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Supplier } from 'src/app/models/supplier.model';
import { SuppliersActionTypes } from './supplier.actions';

export const supplierStateKey = 'suppliers';

export interface SupplierState extends EntityState<Supplier> {
	suppliersLoaded: boolean;
	isLoading: boolean;
}

export const adapter: EntityAdapter<Supplier> = createEntityAdapter<Supplier>({
	selectId: (location: Supplier) => location.supplierid,
});

export const initialState = adapter.getInitialState({
	suppliersLoaded: false,
	isLoading: false,
});

export const supplierReducer = createReducer(
	initialState,
	on(SuppliersActionTypes.loadedSuppliersSuccessfully, (_, action) => adapter.addMany(action.suppliers, {
			...initialState,
			suppliersLoaded: true,
			isLoading: false,
		})),
	on(SuppliersActionTypes.supplierProcessLoading, (state) => ({
			...state,
			isLoading: true,
		})),
	on(SuppliersActionTypes.createSupplierSuccessfully, (state, action) => adapter.addOne(action.supplier, { ...state, isLoading: true })),
	on(SuppliersActionTypes.deleteSupplierSuccessfully, (state, action) => adapter.removeOne(action.supplierid, { ...state, isLoading: true })),
	on(SuppliersActionTypes.updateSupplierSuccessfully, (state, action) => adapter.updateOne(action.update, { ...state, isLoading: true }))
);

export const { selectAll, selectIds, selectEntities, selectTotal } =
	adapter.getSelectors();
