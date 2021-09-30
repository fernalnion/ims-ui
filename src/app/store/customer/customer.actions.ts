import { createAction, props } from '@ngrx/store';
import { Customer } from 'src/app/models/customer.model';
import { Update } from '@ngrx/entity';

enum CustomerActionTypes {
	CREATE_CUSTOMER = '[CUSTOMER] Create Customer ',
	UPDATE_CUSTOMER = '[CUSTOMER] Update Customer',
	DELETE_CUSTOMER = '[CUSTOMER] Delete Customer',
	LOAD_CUSTOMERS = '[CUSTOMER] Load All Customers',
	LOAD_CUSTOMERS_SUCCESSFULLY = '[CUSTOMER] Customers Loaded Successfully',
}

const loadCustomers = createAction(CustomerActionTypes.LOAD_CUSTOMERS);

const customersLoaded = createAction(
	CustomerActionTypes.LOAD_CUSTOMERS_SUCCESSFULLY,
	props<{ customers: Customer[] }>()
);
const crearteCustomer = createAction(
	CustomerActionTypes.CREATE_CUSTOMER,
	props<{ customer: Customer }>()
);

const deleteCustomer = createAction(
	CustomerActionTypes.DELETE_CUSTOMER,
	props<{ customerid: string }>()
);

const updateCustomer = createAction(
	CustomerActionTypes.UPDATE_CUSTOMER,
	props<{ update: Update<Customer> }>()
);

export const customersActionTypes = {
	loadCustomers,
	customersLoaded,
	crearteCustomer,
	deleteCustomer,
	updateCustomer,
};
