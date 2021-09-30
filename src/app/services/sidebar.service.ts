import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class SidebarService {
	private leftMenuSubject: BehaviorSubject<boolean>;
	public leftMenu: Observable<boolean>;
	constructor() {
		this.leftMenuSubject = new BehaviorSubject<boolean>(true);
		this.leftMenu = this.leftMenuSubject.asObservable();
	}

	public get leftMenuStatus(): boolean {
		return this.leftMenuSubject.value;
	}

	toggleLeftMenu(): void {
		this.leftMenuSubject.next(!this.leftMenuStatus);
	}
}
