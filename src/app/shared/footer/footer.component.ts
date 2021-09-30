import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	host: { class: 'app-footer' },
})
export class FooterComponent {
	get year() {
		return new Date().getFullYear();
	}
}
