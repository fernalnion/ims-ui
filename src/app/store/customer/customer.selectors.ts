import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
	CustomerState,
	selectAll,
	customerStateKey,
} from './customer.reducers';

export const customerFeatureSelector =
	createFeatureSelector<CustomerState>(customerStateKey);

export const getAllCustomers = createSelector(customerFeatureSelector, selectAll);
export const areCustomersLoaded = createSelector(
	customerFeatureSelector,
	(state) => state.coursesLoaded
);
