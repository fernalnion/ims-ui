import {
	HttpErrorResponse,
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
	HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AccountService } from '../services/account.service';
import { AlertService } from '../services/alert.service';

@Injectable()
class ErrorInterceptor implements HttpInterceptor {
	constructor(
		private accountService: AccountService,
		private alartService: AlertService
	) {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(request).pipe(
			catchError((err: HttpErrorResponse) => {
				if (err.status === 401) {
					this.accountService.logout();
				}
				const error = err.error.message || err.statusText;
				this.alartService.error(err.error.message || err.statusText);
				return throwError(error);
			})
		);
	}
}

export const errorInterceptorProviders = [
	{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
];
