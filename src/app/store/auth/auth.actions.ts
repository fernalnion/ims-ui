import { Action, createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

enum AuthActionTypes {
	CLEAR_LOGIN = '[Auth] Clear',
	LOGIN = '[Auth] Login',
	LOGIN_SUCCESS = '[Auth] Login Success',
	LOGIN_FAILURE = '[Auth] Login Failure',
}

const clearLogin = createAction(AuthActionTypes.CLEAR_LOGIN);
const login = createAction(AuthActionTypes.LOGIN, props<any>());
const loginSuccess = createAction(
	AuthActionTypes.LOGIN_SUCCESS,
	props<{ user: User; lastLogin: Date }>()
);
const loginFailure = createAction(
	AuthActionTypes.LOGIN_FAILURE,
	props<{ errorMessage: String }>()
);

export const authActionTypes = {
	clearLogin,
	login,
	loginSuccess,
	loginFailure,
};
