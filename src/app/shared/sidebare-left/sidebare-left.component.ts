import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';

export interface MenuItem {
	text: string;
	icon?: string | '';
	link?: string;
	children?: MenuItem[];
}

@Component({
	selector: 'app-sidebare-left',
	templateUrl: './sidebare-left.component.html',
	styleUrls: ['./sidebare-left.component.scss'],
})
export class SidebareLeftComponent implements OnInit {
	menuItems: MenuItem[] = [];
	constructor(private sidebarService: SidebarService) {}
	get leftMenuStatus(): boolean {
		return this.sidebarService.leftMenuStatus;
	}

	toggleLeftMenu(): void {
		this.sidebarService.toggleLeftMenu();
	}

	ngOnInit() {
		this.menuItems = [
			{
				text: 'Customers',
				icon: 'team',
				link: '/customers',
			},
			{
				text: 'Suppliers',
				icon: 'team',
				link: '/suppliers',
			},
			{
				text: 'Users',
				icon: 'user',
				link: '/users',
			},
			{
				text: 'Inventory',
				icon: 'bank',
				children: [
					{
						text: 'Orders',
						link: '/orders',
					},
					{
						text: 'Payments',
						link: '/payments',
					},
					{
						text: 'Products',
						link: '/products',
					},
				],
			},
			{
				text: 'File',
				icon: 'file',
				link: '/files',
			},
		];
	}
}
