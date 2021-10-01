import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Customer } from '../models/customer.model';

@Injectable({
	providedIn: 'root',
})
export class CustomerService {
	constructor(private http: HttpClient) {}

	createCustomer(payload: Customer) {
		return this.http.post<Customer>(`${environment.apiUrl}/customers`, {
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
