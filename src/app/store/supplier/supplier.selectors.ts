import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectAll, SupplierState, supplierStateKey } from './supplier.reducers';

export const supplierFeatureSelector =
	createFeatureSelector<SupplierState>(supplierStateKey);
export const getAllSuppliers = createSelector(supplierFeatureSelector, selectAll);
export const areSuppliersLoaded = createSelector(
	supplierFeatureSelector,
	(state) => state.suppliersLoaded
);
