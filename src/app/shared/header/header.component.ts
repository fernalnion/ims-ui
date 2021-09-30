import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
  host:{'class': 'app-header'}
})
export class HeaderComponent implements OnInit {
	constructor(private sidebarService: SidebarService) {}

	ngOnInit() {}

	get leftMenuStatus(): boolean {
		return this.sidebarService.leftMenuStatus;
	}

	toggleLeftMenu(): void {
		this.sidebarService.toggleLeftMenu();
	}
}
