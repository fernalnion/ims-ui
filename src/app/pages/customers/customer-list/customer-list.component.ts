import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
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
	isUpdateActivated: boolean = false;

	searchValue: string = '';
	visible: boolean = false;
	listOfDisplayData: Customer[] = [];
	setOfCheckedId = new Set<number>();

	createModelVisible: boolean = false;
	validateCreateForm!: FormGroup;
	constructor(private customerStore: Store<AppState>, private fb: FormBuilder) {
	}

	ngOnInit() {
		this.customerStore.select(getAllCustomers).subscribe((customers) => {
			this.customers$= [...customers];
			this.listOfDisplayData = [...customers];
		});
	}

	deleteCustomer(customerid: string): void {
		this.customerStore.dispatch(customersActionTypes.deleteCustomer({ customerid }));
	}

	showUpdateModel(customer: Customer): void {
		this.customerToBeUpdated = { ...customer };
		this.isUpdateActivated = true;
	}

	updateCustomer(updateForm: any): void {
		const update: Update<Customer> = {
			id: this.customerToBeUpdated?.customerid || '',
			changes: {
				...this.customerToBeUpdated,
				...updateForm.value,
			},
		};

		this.customerStore.dispatch(customersActionTypes.updateCustomer({ update }));
		this.isUpdateActivated = false;
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
			this.customerStore.dispatch(
				customersActionTypes.crearteCustomer({
					customer: this.validateCreateForm.value,
				})
			);
			this.createModelVisible = false;
		}
	}
}
