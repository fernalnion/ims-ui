import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { AccountService } from 'src/app/services/account.service';
import { authActionTypes } from 'src/app/store/auth/auth.actions';
import { AuthState } from 'src/app/store/auth/auth.reducers';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	host: { class: 'app-login' },
})
export class LoginComponent implements OnInit {
	validateForm!: FormGroup;
	constructor(
		private fb: FormBuilder,
		private authStore: Store<AuthState>,
		private accountService: AccountService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.authStore.dispatch(authActionTypes.clearLogin());

		this.validateForm = this.fb.group({
			username: [null, [Validators.required]],
			password: [null, [Validators.required]],
			remember: [true],
		});
	}

	submitForm() {
		for (const i in this.validateForm.controls) {
			if (this.validateForm.controls.hasOwnProperty(i)) {
				this.validateForm.controls[i].markAsDirty();
				this.validateForm.controls[i].updateValueAndValidity();
			}
		}

		if (this.validateForm.valid) {
			const payload = {
				username: this.validateForm.value.username,
				password: this.validateForm.value.password,
			};

			this.accountService.login(payload).subscribe((data) => {
				if (data.token !== '') {
					this.accountService.setLogin(data.token, data.refreshToken);
				}
			});
		}
	}
}
