import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../models/customer.model';

@Injectable({
	providedIn: 'root',
})
export class CustomerService {
	constructor(private http: HttpClient) {}

	createCustomer(payload: Customer): Observable<Customer> {
		return this.http.post<Customer>(`${environment.apiUrl}/customers/create`, {
			...payload,
		});
	}

	upadteCustomer(customerid: string, payload: Partial<Customer>): Observable<Customer> {
		return this.http.put<Customer>(`${environment.apiUrl}/customers/${customerid}`, {
			...payload,
		});
	}

	deleteCustomer(customerid: string): Observable<Customer> {
		return this.http.delete<Customer>(`${environment.apiUrl}/customers/${customerid}`);
	}

	getCustomers(): Observable<Customer[]> {
		return this.http.get<Customer[]>(`${environment.apiUrl}/customers`);
	}
}
