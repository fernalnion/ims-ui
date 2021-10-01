import { createReducer, on } from '@ngrx/store';
import { Customer } from '../../models/customer.model';
import { customersActionTypes } from './customer.actions';
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
	on(customersActionTypes.customersLoadedSuccessfully, (_, action: any) => {
		return adapter.addMany(action.customers, {
			...initialState,
			customersLoaded: true,
			isLoading: false,
		});
	}),
	on(customersActionTypes.customerProcessLoading, (state) => {
		return {
			...state,
			isLoading: true,
		};
	}),
	on(customersActionTypes.crearteCustomerSuccessfully, (state, action) => {
		return adapter.addOne(action.customer, { ...state, isLoading: false });
	}),
	on(customersActionTypes.deleteCustomerSuccessfully, (state, action) => {
		return adapter.removeOne(action.customerid, { ...state, isLoading: false });
	}),
	on(customersActionTypes.updateCustomerSuccessfully, (state, action) => {
		return adapter.updateOne(action.update, { ...state, isLoading: false });
	})
);

export const { selectAll, selectIds, selectEntities, selectTotal } =
	adapter.getSelectors();
