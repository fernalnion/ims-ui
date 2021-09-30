import { createReducer, on } from '@ngrx/store';
import { Customer } from '../../models/customer.model';
import { customersActionTypes } from './customer.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export const customerStateKey = 'customers';

export interface CustomerState extends EntityState<Customer> {
	customersLoaded: boolean;
}

export const adapter: EntityAdapter<Customer> = createEntityAdapter<Customer>({
	selectId: (location: Customer) => location.customerid,
});

export const initialState = adapter.getInitialState({
	customersLoaded: false,
});

export const customerReducer = createReducer(
	initialState,
	on(customersActionTypes.customersLoaded, (state, action: any) => {
		return adapter.addMany(action.customers, { ...initialState, customersLoaded: true });
	}),
	on(customersActionTypes.crearteCustomer, (state, action) => {
		return {
			...state,
			customer: action.customer,
		};
	}),
	on(customersActionTypes.crearteCustomerSuccessfully, (state, action) => {
		return adapter.addOne(action.customer, { ...state, customersLoaded: true });
	}),
	on(customersActionTypes.deleteCustomer, (state, action) => {
		return {
			...state,
			customerid: action.customerid,
		};
	}),
	on(customersActionTypes.deleteCustomerSuccessfully, (state, action) => {
		return adapter.removeOne(action.customerid,  { ...state, customersLoaded: true });
	}),
	on(customersActionTypes.updateCustomer, (state, action) => {
		return {
			...state,
			update: action.update,
		};
	}),
	on(customersActionTypes.updateCustomerSuccessfully, (state, action) => {
		return adapter.updateOne(action.update,  { ...state, customersLoaded: true });
	})
);

export const { selectAll, selectIds, selectEntities, selectTotal } =
	adapter.getSelectors();
