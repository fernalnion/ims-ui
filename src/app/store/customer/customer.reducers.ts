import { createReducer, on } from '@ngrx/store';
import { Customer } from '../../models/customer.model';
import { CustomersActionTypes } from './customer.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export const customerStateKey = 'customers';

export interface CustomerState extends EntityState<Customer> {
	customersLoaded: boolean;
	isLoading: boolean;
}

export const adapter: EntityAdapter<Customer> = createEntityAdapter<Customer>({
	selectId: (location: Customer) => location.customerid,
});

export const initialState = adapter.getInitialState({
	customersLoaded: false,
	isLoading: false,
});

export const customerReducer = createReducer(
	initialState,
	on(CustomersActionTypes.LoadedcustomersSuccessfully, (_, action: any) => adapter.addMany(action.customers, {
			...initialState,
			customersLoaded: true,
			isLoading: false,
		})),
	on(CustomersActionTypes.customerProcessLoading, (state) => ({
			...state,
			isLoading: true,
		})),
	on(CustomersActionTypes.createCustomerSuccessfully, (state, action) => adapter.addOne(action.customer, { ...state, isLoading: false })),
	on(CustomersActionTypes.deleteCustomerSuccessfully, (state, action) => adapter.removeOne(action.customerid, { ...state, isLoading: false })),
	on(CustomersActionTypes.updateCustomerSuccessfully, (state, action) => adapter.updateOne(action.update, { ...state, isLoading: false }))
);

export const { selectAll, selectIds, selectEntities, selectTotal } =
	adapter.getSelectors();
