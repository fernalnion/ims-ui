import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Update } from '@ngrx/entity';

import { Customer } from 'src/app/models/customer.model';
import { customersActionTypes } from 'src/app/store/customer/customer.actions';
import { getAllCustomers } from 'src/app/store/customer/customer.selectors';
import { AppState } from 'src/app/store/reducers';

@Component({
	selector: 'app-customer-list',
	templateUrl: './customer-list.component.html',
	styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent implements OnInit {
	customers$: Observable<Customer[]> | null = null;
	customerToBeUpdated: Customer | null = null;
	isUpdateActivated: boolean = false;
	constructor(private customerStore: Store<AppState>) {}

	ngOnInit() {
		this.customers$ = this.customerStore.select(getAllCustomers);
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
}
