import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
	providedIn: 'root',
})
export class AlertService {
	constructor(private messageService: NzMessageService) {}

	// convenience methods
	success(message: string, options?: any) {
		this.messageService.success(message, options);
	}

	error(message: string, options?: any) {
		this.messageService.error(message, options);
	}

	info(message: string, options?: any) {
		this.messageService.info(message, options);
	}

	warn(message: string, options?: any) {
		this.messageService.warning(message, options);
	}
}
