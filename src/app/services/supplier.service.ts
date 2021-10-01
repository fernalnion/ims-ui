import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Supplier } from '../models/supplier.model';

@Injectable({
	providedIn: 'root',
})
export class SupplierService {
	constructor(private http: HttpClient) {}

	createSupplier(payload: Supplier) {
		return this.http.post<Supplier>(`${environment.apiUrl}/suppliers`, {
			...payload,
		});
	}

	upadteSupplier(supplierid: string, payload: Partial<Supplier>): Observable<Supplier> {
		return this.http.put<Supplier>(`${environment.apiUrl}/suppliers/${supplierid}`, {
			...payload,
		});
	}

	deleteSupplier(supplierid: string): Observable<Supplier> {
		return this.http.delete<Supplier>(`${environment.apiUrl}/suppliers/${supplierid}`);
	}

	getCustomers(): Observable<Supplier[]> {
		return this.http.get<Supplier[]>(`${environment.apiUrl}/suppliers`);
	}
}
