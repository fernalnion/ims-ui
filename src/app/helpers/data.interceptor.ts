import {
	HttpEvent,
	HttpEventType,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
	HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
class DataInterceptor implements HttpInterceptor {
	constructor() {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(request).pipe(
			map((result: HttpEvent<any>) => {
				if (result.type === HttpEventType.Response && result.body) {
					return result.clone({
						body: result.body.data,
					});
				} else {
					return result;
				}
			})
		);
	}
}

export const dataInterceptorProviders = [
	{ provide: HTTP_INTERCEPTORS, useClass: DataInterceptor, multi: true },
];
