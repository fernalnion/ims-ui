import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Customer } from 'src/app/models/customer.model';
import { customersActionTypes } from 'src/app/store/customer/customer.actions';
import { getAllCustomers } from 'src/app/store/customer/customer.selectors';
import { AppState } from 'src/app/store/reducers';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-customer-list',
	templateUrl: './customer-list.component.html',
	styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent implements OnInit {
	customers$: Customer[] = [];
	customerToBeUpdated: Customer | null = null;

	searchValue: string = '';
	visible: boolean = false;
	listOfDisplayData: Customer[] = [];
	setOfCheckedId = new Set<string>();
	expandSet = new Set<string>();

	createModelVisible: boolean = false;
	validateCreateForm!: FormGroup;
	constructor(private customerStore: Store<AppState>, private fb: FormBuilder) {}

	ngOnInit() {
		this.customerStore.select(getAllCustomers).subscribe((customers) => {
			this.customers$ = [...customers];
			this.listOfDisplayData = [...customers];
		});
	}

	createCustomer(customer: Customer): void {
		this.customerStore.dispatch(customersActionTypes.crearteCustomer({ customer }));
	}
	deleteCustomer(customerid: string): void {
		this.customerStore.dispatch(customersActionTypes.deleteCustomer({ customerid }));
	}

	updateCustomer(updatedValues: Customer): void {
		const update: Update<Customer> = {
			id: this.customerToBeUpdated?.customerid || '',
			changes: {
				...this.customerToBeUpdated,
				...updatedValues,
			},
		};

		this.customerStore.dispatch(customersActionTypes.updateCustomer({ update }));
		this.customerToBeUpdated = null;
	}

	reset(): void {
		this.searchValue = '';
		this.search();
	}

	search(): void {
		this.visible = false;
		this.listOfDisplayData = this.customers$.filter((f: Customer) =>
			f.phone.includes(this.searchValue)
		);
	}

	open(): void {
		this.validateCreateForm = this.fb.group({
			firstname: [null, [Validators.required]],
			lastname: [null],
			email: [null, [Validators.required]],
			phone: [null, [Validators.required]],
			address1: [null, [Validators.required]],
			address2: [null],
			city: [null, [Validators.required]],
			state: [null, [Validators.required]],
			country: [null, [Validators.required]],
			pincode: [null, [Validators.required]],
		});
		this.createModelVisible = true;
	}

	update(olddata: Customer): void {
		this.customerToBeUpdated = { ...olddata };
		this.validateCreateForm = this.fb.group({
			firstname: [olddata.firstname, [Validators.required]],
			lastname: [olddata.lastname],
			email: [olddata.email, [Validators.required]],
			phone: [olddata.phone, [Validators.required]],
			address1: [olddata.address1, [Validators.required]],
			address2: [olddata.address2],
			city: [olddata.city, [Validators.required]],
			state: [olddata.state, [Validators.required]],
			country: [olddata.country, [Validators.required]],
			pincode: [olddata.pincode, [Validators.required]],
			customerid: [olddata.customerid],
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
			if (this.validateCreateForm.value.customerid) {
				this.updateCustomer(this.validateCreateForm.value);
			} else {
				this.createCustomer(this.validateCreateForm.value);
			}

			this.createModelVisible = false;
		}
	}

	onExpandChange(customerid: string, checked: boolean): void {
		if (checked) {
			this.expandSet.add(customerid);
		} else {
			this.expandSet.delete(customerid);
		}
	}
}
