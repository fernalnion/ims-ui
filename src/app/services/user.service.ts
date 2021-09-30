import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	constructor(private http: HttpClient) {}

	getAll() {
		return this.http.get<User[]>(`${environment.apiUrl}/users`);
	}

	getById(userid: string) {
		return this.http.get<User>(`${environment.apiUrl}/users/${userid}`);
	}

	delete(userid: string) {
		return this.http.delete(`${environment.apiUrl}/users/${userid}`);
	}

	update(userid: string, params: Partial<User>) {
		return this.http.put(`${environment.apiUrl}/users/${userid}`, params);
	}
}
