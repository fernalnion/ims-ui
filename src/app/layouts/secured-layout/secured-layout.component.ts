import { Component, OnDestroy, OnInit } from '@angular/core';
import {
	NavigationEnd,
	NavigationError,
	RouteConfigLoadStart,
	Router,
} from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert.service';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
	selector: 'app-secured-layout',
	templateUrl: './secured-layout.component.html',
	host: { class: 'app-secured-layout ant-layout' },
})
export class SecuredLayoutComponent implements OnInit, OnDestroy {
	private unsubscribe$ = new Subject<void>();
	isFetching = true;
	constructor(
		private sidebarService: SidebarService,
		private router: Router,
		private alertService: AlertService
	) {
		this.router.events.pipe(takeUntil(this.unsubscribe$)).subscribe((evt) => {
			if (!this.isFetching && evt instanceof RouteConfigLoadStart) {
				this.isFetching = true;
			}

			if (evt instanceof NavigationError) {
				this.isFetching = false;
				this.alertService.error(evt.url, { nzDuration: 1000 * 3 });
				return;
			}

			if (!(evt instanceof NavigationEnd)) {
				return;
			}
			this.isFetching = false;
			this.alertService.success('Loading Success', { nzDuration: 1000 * 3 });
		});
	}

	get leftMenuStatus(): boolean {
		return this.sidebarService.leftMenuStatus;
	}

	toggleLeftMenu(): void {
		this.sidebarService.toggleLeftMenu();
	}
	ngOnInit() {}
	ngOnDestroy(): void {
		const { unsubscribe$ } = this;
		unsubscribe$.next();
		unsubscribe$.complete();
	}
}
