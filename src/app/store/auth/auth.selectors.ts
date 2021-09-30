import { state } from '@angular/animations';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
	AuthState,
	AuthStateKey,
	selectIds,
	selectEntities,
	selectAll,
	selectTotal,
	getSelectedUserId,
} from './auth.reducers';
export const selectAuthState = createFeatureSelector<AuthState>(AuthStateKey);

export const getLogin = createSelector(
	selectEntities,
	getSelectedUserId,
	(userEntities, userid) => (userid ? userEntities[userid] : null)
);

export const selectUserIds = createSelector(selectAuthState, selectIds);
export const selectUserEntities = createSelector(selectAuthState, selectEntities);
export const selectAllUsers = createSelector(selectAuthState, selectAll);
export const selectUserTotal = createSelector(selectAuthState, selectTotal);
export const selectCurrentUserId = createSelector(selectAuthState, getSelectedUserId);

export const selectCurrentUser = createSelector(
	selectUserEntities,
	selectCurrentUserId,
	(userEntities, userId) => userEntities[userId]
);
