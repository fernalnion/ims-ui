import { Injectable } from '@angular/core';

const accessTokenKeys = {
	PAYLOAD_KEY: 'hDUWvQBh47YgaKXa28HbYtZqvq8Ph4Fm',
	ALG_KEY: 'Tm3XbhTM2hMytm6WyTkuY7YaNwpXjnXb',
	HASH_KEY: 'TQyeaCZC8p5WEHDxvHHLPYNy4qzpYAaE',
};

const refreshTokenKeys = {
	PAYLOAD_KEY: 'k857ELa6xj5TtkEHeupf6dzHLTCJEcpN',
	ALG_KEY: 'fAnKg2EbmmHFhfernTkHJJctv7LBj2zB',
	HASH_KEY: 'zMEb44Q5abdbTvHCVazyWbMGjzdurYTE',
};

@Injectable({
	providedIn: 'root',
})
export class TokenService {
	constructor() {}

	clearAccessTokens(): void {
		Object.values(accessTokenKeys).forEach((key) =>
			window.sessionStorage.removeItem(key)
		);
	}

	clearRefreshToken(): void {
		Object.values(refreshTokenKeys).forEach((key) =>
			window.sessionStorage.removeItem(key)
		);
	}

	clearTokens(): void {
		[...Object.values(accessTokenKeys), ...Object.values(refreshTokenKeys)].forEach(
			(key) => window.sessionStorage.removeItem(key)
		);
	}

	saveToken(accessToken: string): void {
		this.clearAccessTokens();
		const [agl, payload, hash] = accessToken.split('.');
		window.sessionStorage.setItem(accessTokenKeys.ALG_KEY, agl || '');
		window.sessionStorage.setItem(accessTokenKeys.PAYLOAD_KEY, payload || '');
		window.sessionStorage.setItem(accessTokenKeys.HASH_KEY, hash || '');
	}

	saveRefreshToken(refreshToken: string): void {
		this.clearRefreshToken();
		const [agl, payload, hash] = refreshToken.split('.');
		window.sessionStorage.setItem(refreshTokenKeys.ALG_KEY, agl || '');
		window.sessionStorage.setItem(refreshTokenKeys.PAYLOAD_KEY, payload || '');
		window.sessionStorage.setItem(refreshTokenKeys.HASH_KEY, hash || '');
	}

	getToken(): string | undefined {
		const agl = window.sessionStorage.getItem(accessTokenKeys.ALG_KEY);
		const payload = window.sessionStorage.getItem(accessTokenKeys.PAYLOAD_KEY);
		const hash = window.sessionStorage.getItem(accessTokenKeys.HASH_KEY);
		return agl && payload && hash ? [agl, payload, hash].join('.') : undefined;
	}

	logout(): void {
		window.sessionStorage.clear();
		this.clearTokens();
	}

	getRefreshToken(): string | undefined {
		const agl = window.sessionStorage.getItem(refreshTokenKeys.ALG_KEY);
		const payload = window.sessionStorage.getItem(refreshTokenKeys.PAYLOAD_KEY);
		const hash = window.sessionStorage.getItem(refreshTokenKeys.HASH_KEY);
		return [agl, payload, hash]
			.filter((x) => !!(x !== undefined && x !== null && x !== ''))
			.join('.');
	}

	getUser(): string | undefined {
		const payload = window.sessionStorage.getItem(accessTokenKeys.PAYLOAD_KEY);
		return payload ? JSON.parse(payload) : undefined;
	}
}
