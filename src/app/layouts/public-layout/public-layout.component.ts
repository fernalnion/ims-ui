import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-public-layout',
	templateUrl: './public-layout.component.html',
	host: { class: 'app-public-layout ant-layout' },
})
export class PublicLayoutComponent implements OnInit {
	constructor() {}

	ngOnInit() {}
}
