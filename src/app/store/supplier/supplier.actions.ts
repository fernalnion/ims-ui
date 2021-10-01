import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Supplier } from 'src/app/models/supplier.model';

const enum SUPPLIER_ACTION_TYPE_ENUM {
	CREATE_SUPPLIER = '[SUPPLIER] Create Supplier',
	CREATE_SUPPLIER_SUCCESSFULLY = '[SUPPLIER] Successfully Created Supplier',
	UPDATE_SUPPLIER = '[SUPPLIER] Update Supplier',
	UPDATE_SUPPLIER_SUCCESSFULLY = '[SUPPLIER] Successfully Updated Supplier',
	DELETE_SUPPLIER = '[SUPPLIER] Delete Supplier',
	DELETE_SUPPLIER_SUCCESSFULLY = '[SUPPLIER] Successfully Deleted Supplier',
	LOAD_SUPPLIERS = '[SUPPLIER] Load Supplier',
	LOAD_SUPPLIERS_SUCCESSFULLY = '[SUPPLIER] Successfully Loaded Supplier',
	LOADING_SUPPLIER_PROCESS = '[SUPPLIER] Supplier Process Loading',
}

const supplierProcessLoading = createAction(
	SUPPLIER_ACTION_TYPE_ENUM.LOADING_SUPPLIER_PROCESS
);

const loadSuppliers = createAction(SUPPLIER_ACTION_TYPE_ENUM.LOAD_SUPPLIERS);
const loadedSuppliersSuccessfully = createAction(
	SUPPLIER_ACTION_TYPE_ENUM.LOAD_SUPPLIERS_SUCCESSFULLY,
	props<{ suppliers: Supplier[] }>()
);

const createSupplier = createAction(
	SUPPLIER_ACTION_TYPE_ENUM.CREATE_SUPPLIER,
	props<{ supplier: Supplier }>()
);
const createSupplierSuccessfully = createAction(
	SUPPLIER_ACTION_TYPE_ENUM.CREATE_SUPPLIER_SUCCESSFULLY,
	props<{ supplier: Supplier }>()
);

const deleteSupplier = createAction(
	SUPPLIER_ACTION_TYPE_ENUM.DELETE_SUPPLIER,
	props<{ supplierid: string }>()
);
const deleteSupplierSuccessfully = createAction(
	SUPPLIER_ACTION_TYPE_ENUM.DELETE_SUPPLIER_SUCCESSFULLY,
	props<{ supplierid: string }>()
);

const updateSupplier = createAction(
	SUPPLIER_ACTION_TYPE_ENUM.UPDATE_SUPPLIER,
	props<{ update: Update<Supplier> }>()
);
const updateSupplierSuccessfully = createAction(
	SUPPLIER_ACTION_TYPE_ENUM.UPDATE_SUPPLIER_SUCCESSFULLY,
	props<{ update: Update<Supplier> }>()
);

export const SuppliersActionTypes = {
	supplierProcessLoading,

	loadSuppliers,
	loadedSuppliersSuccessfully,

	createSupplier,
	createSupplierSuccessfully,

	deleteSupplier,
	deleteSupplierSuccessfully,

	updateSupplier,
	updateSupplierSuccessfully,
};
