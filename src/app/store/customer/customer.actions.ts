import { createAction, props } from '@ngrx/store';
import { Customer } from 'src/app/models/customer.model';
import { Update } from '@ngrx/entity';

enum CUSTOMER_ACTION_TYPE_ENUM {
	CREATE_CUSTOMER = '[CUSTOMER] Create Customer ',
	CREATE_CUSTOMER_SUCCESSFULLY = '[CUSTOMER] Successfully Created Customer',
	UPDATE_CUSTOMER = '[CUSTOMER] Update Customer',
	UPDATE_CUSTOMER_SUCCESSFULLY = '[CUSTOMER] Successfully Updated Customer',
	DELETE_CUSTOMER = '[CUSTOMER] Delete Customer',
	DELETE_CUSTOMER_SUCCESSFULLY = '[CUSTOMER] Successfully Deleted Customer',
	LOAD_CUSTOMERS = '[CUSTOMER] Load All Customers',
	LOAD_CUSTOMERS_SUCCESSFULLY = '[CUSTOMER] Customers Loaded Successfully',
	LOADING_CUSTOMERS_PROCESS = '[CUSTOMER] Customer Process Loading',
}

const customerProcessLoading = createAction(
	CUSTOMER_ACTION_TYPE_ENUM.LOADING_CUSTOMERS_PROCESS
);

const loadCustomers = createAction(CUSTOMER_ACTION_TYPE_ENUM.LOAD_CUSTOMERS);

const LoadedcustomersSuccessfully = createAction(
	CUSTOMER_ACTION_TYPE_ENUM.LOAD_CUSTOMERS_SUCCESSFULLY,
	props<{ customers: Customer[] }>()
);

const createCustomer = createAction(
	CUSTOMER_ACTION_TYPE_ENUM.CREATE_CUSTOMER,
	props<{ customer: Customer }>()
);

const createCustomerSuccessfully = createAction(
	CUSTOMER_ACTION_TYPE_ENUM.CREATE_CUSTOMER_SUCCESSFULLY,
	props<{ customer: Customer }>()
);

const deleteCustomer = createAction(
	CUSTOMER_ACTION_TYPE_ENUM.DELETE_CUSTOMER,
	props<{ customerid: string }>()
);

const deleteCustomerSuccessfully = createAction(
	CUSTOMER_ACTION_TYPE_ENUM.DELETE_CUSTOMER_SUCCESSFULLY,
	props<{ customerid: string }>()
);

const updateCustomer = createAction(
	CUSTOMER_ACTION_TYPE_ENUM.UPDATE_CUSTOMER,
	props<{ update: Update<Customer> }>()
);

const updateCustomerSuccessfully = createAction(
	CUSTOMER_ACTION_TYPE_ENUM.UPDATE_CUSTOMER_SUCCESSFULLY,
	props<{ update: Update<Customer> }>()
);

export const CustomersActionTypes = {
	customerProcessLoading,

	loadCustomers,
	LoadedcustomersSuccessfully,

	createCustomer,
	createCustomerSuccessfully,

	deleteCustomer,
	deleteCustomerSuccessfully,

	updateCustomer,
	updateCustomerSuccessfully,
};
