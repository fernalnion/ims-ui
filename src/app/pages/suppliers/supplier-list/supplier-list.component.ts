import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Update } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { Supplier } from 'src/app/models/supplier.model';
import { AppState } from 'src/app/store/reducers';
import { SuppliersActionTypes } from 'src/app/store/supplier/supplier.actions';
import { getAllSuppliers } from 'src/app/store/supplier/supplier.selectors';

@Component({
	selector: 'app-supplier-list',
	templateUrl: './supplier-list.component.html',
	styleUrls: ['./supplier-list.component.scss'],
})
export class SupplierListComponent implements OnInit {
	suppliers$: Supplier[] = [];
	supplierToBeUpdated: Supplier | null = null;

	searchValue = '';
	visible = false;
	listOfDisplayData: Supplier[] = [];
	setOfCheckedId = new Set<string>();
	expandSet = new Set<string>();

	createModelVisible = false;
	validateCreateForm!: FormGroup;
	constructor(private appStore: Store<AppState>, private fb: FormBuilder) {}

	ngOnInit() {
		this.appStore.select(getAllSuppliers).subscribe((suppliers) => {
			this.suppliers$ = [...suppliers];
			this.listOfDisplayData = [...suppliers];
		});
	}

	createCustomer(supplier: Supplier): void {
		this.appStore.dispatch(SuppliersActionTypes.createSupplier({ supplier }));
	}
	deleteCustomer(supplierid: string): void {
		this.appStore.dispatch(SuppliersActionTypes.deleteSupplier({ supplierid }));
	}

	updateCustomer(updatedValues: Supplier): void {
		const update: Update<Supplier> = {
			id: this.supplierToBeUpdated?.supplierid || '',
			changes: {
				...this.supplierToBeUpdated,
				...updatedValues,
			},
		};

		this.appStore.dispatch(SuppliersActionTypes.updateSupplier({ update }));
		this.supplierToBeUpdated = null;
	}

	reset(): void {
		this.searchValue = '';
		this.search();
	}

	search(): void {
		this.visible = false;
		this.listOfDisplayData = this.suppliers$.filter((f: Supplier) =>
			f.phone.includes(this.searchValue)
		);
	}

	open(): void {
		this.validateCreateForm = this.fb.group({
			name: [null, [Validators.required]],
			email: [null, [Validators.required]],
			phone: [null, [Validators.required]],
			address1: [null, [Validators.required]],
			address2: [null],
			city: [null, [Validators.required]],
			state: [null, [Validators.required]],
			country: [null, [Validators.required]],
			pincode: [null, [Validators.required]],
			otherDetails: [null],
		});
		this.createModelVisible = true;
	}

	update(olddata: Supplier): void {
		this.supplierToBeUpdated = { ...olddata };
		this.validateCreateForm = this.fb.group({
			name: [olddata.name, [Validators.required]],
			email: [olddata.email, [Validators.required]],
			phone: [olddata.phone, [Validators.required]],
			address1: [olddata.address1, [Validators.required]],
			address2: [olddata.address2],
			city: [olddata.city, [Validators.required]],
			state: [olddata.state, [Validators.required]],
			country: [olddata.country, [Validators.required]],
			pincode: [olddata.pincode, [Validators.required]],
			otherDetails: [olddata.otherDetails],
			supplierid: [olddata.supplierid],
		});
		this.createModelVisible = true;
	}

	close(): void {
		this.createModelVisible = false;
	}

	submitCreateForm(): void {
		for (const i in this.validateCreateForm.controls) {
			if (this.validateCreateForm.controls.hasOwnProperty(i)) {
				this.validateCreateForm.controls[i].markAsDirty();
				this.validateCreateForm.controls[i].updateValueAndValidity();
			}
		}

		if (this.validateCreateForm.valid) {
			if (this.validateCreateForm.value.supplierid) {
				this.updateCustomer(this.validateCreateForm.value);
			} else {
				this.createCustomer(this.validateCreateForm.value);
			}

			this.createModelVisible = false;
		}
	}

	onExpandChange(supplierid: string, checked: boolean): void {
		if (checked) {
			this.expandSet.add(supplierid);
		} else {
			this.expandSet.delete(supplierid);
		}
	}
}
