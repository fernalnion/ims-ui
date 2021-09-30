import { createReducer, on } from '@ngrx/store';
import { Customer } from '../../models/customer.model';
import {customersActionTypes} from './customer.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export const customerStateKey = 'customers';

export interface CustomerState extends EntityState<Customer> {
	coursesLoaded: boolean;
}

export const adapter: EntityAdapter<Customer> = createEntityAdapter<Customer>({
	selectId: (location: Customer) => location.customerid,
});

export const initialState = adapter.getInitialState({
	coursesLoaded: false,
});

export const customerReducer = createReducer(
	initialState,
	on(customersActionTypes.customersLoaded, (state, action: any) => {
		return adapter.addMany(action.customers, { ...state, coursesLoaded: true });
	}),
	on(customersActionTypes.crearteCustomer, (state, action) => {
		return adapter.addOne(action.customer, state);
	}),
	on(customersActionTypes.deleteCustomer, (state, action) => {
		return adapter.removeOne(action.customerid, state);
	}),
	on(customersActionTypes.updateCustomer, (state, action) => {
		return adapter.updateOne(action.update, state);
	})
);

export const { selectAll, selectIds, selectEntities, selectTotal } = adapter.getSelectors();
