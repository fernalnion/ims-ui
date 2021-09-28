import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
@Injectable({
	providedIn: 'root',
})
export class AccountService {
	private userSubject: BehaviorSubject<User>;
	public user: Observable<User>;

	constructor(private router: Router, private http: HttpClient) {}
}
