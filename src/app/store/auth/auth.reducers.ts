import { createReducer, on } from '@ngrx/store';
import { authActionTypes } from './auth.actions';
import { User } from '../../models/user.model';
import { createEntityAdapter, EntityAdapter, EntityState, Update } from '@ngrx/entity';

export const AuthStateKey = 'auth';

export interface AuthState extends EntityState<User> {
	selectedUserId: string;
	loading: boolean;
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>({
	selectId: (location: User) => location.userid,
});

export const initialState = adapter.getInitialState({
	selectedUserId: null,
	loading: false,
});

export const authReducer = createReducer(
	initialState,
	on(authActionTypes.clearLogin, () => initialState),
	on(authActionTypes.login, () => {
		return { ...initialState, loading: true };
	}),
	on(authActionTypes.loginSuccess, (state, action) => {
		return adapter.addOne(action.user, <any>{
			...state,
			loading: false,
			selectedUserId: action.user.userid,
		});
	})
);

export const getSelectedUserId = (state: AuthState) => state.selectedUserId;

export const { selectAll, selectIds, selectEntities, selectTotal } =
	adapter.getSelectors();
