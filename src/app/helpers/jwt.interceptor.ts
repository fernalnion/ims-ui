import {
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
	HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccountService } from '../services/account.service';
import { TokenService } from '../services/token.service';

@Injectable()
class JwtInterceptor implements HttpInterceptor {
	constructor(
		private accountService: AccountService,
		private tokenService: TokenService
	) {}
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		// add auth header with jwt if user is logged in and request is to the api url
		const user = this.accountService.getuser();
		const token = this.tokenService.getToken();
		const refreshToken = this.tokenService.getRefreshToken();
		const isLoggedIn = user && token && refreshToken !== '';
		const isApiUrl = request.url.startsWith(environment.apiUrl);
		if (isLoggedIn && isApiUrl) {
			request = request.clone({
				setHeaders: {
					Authorization: `Bearer ${token}`,
					'Set-Cookie': `refreshToken=${refreshToken}`,
				},
			});
		}
		return next.handle(request);
	}
}

export const authInterceptorProviders = [
	{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
];
