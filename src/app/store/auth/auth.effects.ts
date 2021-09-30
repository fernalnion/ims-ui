import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, first, tap } from 'rxjs/operators';
import { AccountService } from 'src/app/services/account.service';
import { authActionTypes } from './auth.actions';

@Injectable()
export class AuthEffects {
	LoginSuccess$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(authActionTypes.loginSuccess),
				tap(() => {
					const returnUrl = this.route$.snapshot.queryParamMap.get('returnUrl');
					this.router$.navigate([returnUrl || '/welcome']);
				})
			),
		{ dispatch: false }
	);

	LoginClear$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(authActionTypes.clearLogin),
				map(() => {
					this.accountService.logout();
				})
			),
		{ dispatch: false }
	);

	Logout$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(authActionTypes.clearLogin),
				first(),
				map(() => {
					// remove user from local storage and set current user to null
					localStorage.removeItem('user');
					if (!this.router$.url.includes('/public/login')) {
						this.router$.navigate(['/public/login']);
					}
				})
			),
		{ dispatch: false }
	);

	constructor(
		private actions$: Actions,
		private router$: Router,
		private route$: ActivatedRoute,
		private accountService: AccountService
	) {}
}
