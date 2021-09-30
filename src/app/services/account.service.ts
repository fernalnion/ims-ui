import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { TokenService } from './token.service';
import { differenceInMilliseconds } from 'date-fns';
import { AppState } from '../store/reducers';
import { Store } from '@ngrx/store';
import { authActionTypes } from '../store/auth/auth.actions';
@Injectable({
	providedIn: 'root',
})
export class AccountService {
	private tokenTimer: any;
	isLoggedIn = false;
	redirectUrl: any = '/';
	constructor(
		private router: Router,
		private http: HttpClient,
		private jwtHelper: JwtHelperService,
		private tokenService: TokenService,
		private authState: Store<AppState>
	) {
		this.setAuthTimer();
	}

	login({ username, password }: any): Observable<User> {
		return this.http.post<User>(`${environment.apiUrl}/public/login`, {
			username,
			password,
		});
	}

	logout(): void {
		clearTimeout(this.tokenTimer);
		this.tokenService.logout();
		this.isLoggedIn = false;
	}

	getuser(): User | undefined {
		this.isLoggedIn = true;
		return this.jwtHelper.isTokenExpired()
			? undefined
			: this.jwtHelper.decodeToken(this.tokenService.getToken());
	}

	setLogin(accessToken: string, refreshToken: string): void {
		this.tokenService.saveToken(accessToken);
		this.tokenService.saveRefreshToken(refreshToken);
		this.setAuthTimer();
	}

	refreshToken(): Observable<any> {
		return this.http.post<User>(`${environment.apiUrl}/users/refresh-token`, {});
	}

	private setAuthTimer() {
		if (
			this.jwtHelper.getTokenExpirationDate() !== null &&
			this.jwtHelper.getTokenExpirationDate() !== undefined
		) {
			const tokenDiffMS = differenceInMilliseconds(
				this.jwtHelper.getTokenExpirationDate() || new Date(),
				new Date()
			);

			const tokenRefreshTime = 1000 * 60 * 5;
			if (tokenDiffMS > tokenRefreshTime) {
				clearTimeout(this.tokenTimer);
				this.tokenTimer = setTimeout(() => {
					this.fetchRefreshToken();
				}, tokenDiffMS - tokenRefreshTime);

				const temp = {
					user: this.getuser(),
					lastlogin: new Date(),
				};
				this.authState.dispatch(authActionTypes.loginSuccess(<any>temp));
			}
		}
	}

	private fetchRefreshToken() {
		this.refreshToken().subscribe((result: any) => {
			this.tokenService.saveToken(result.token);
			this.tokenService.saveRefreshToken(result.refreshToken);
			clearTimeout(this.tokenTimer);
			this.setAuthTimer();
		});
	}
}
