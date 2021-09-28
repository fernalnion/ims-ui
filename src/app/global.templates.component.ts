import { Component, TemplateRef, ViewChild } from '@angular/core';
// Exporting is required for AOT compatibility
@Component({
	template: `
		<ng-template #nzIndicatorTpl>
			<span class="ant-spin-dot">
				<i nz-icon [nzType]="'loading'"></i>
			</span>
		</ng-template>
	`,
})
export class GlobalTemplatesComponent {
	@ViewChild('nzIndicatorTpl', { static: true })
	nzIndicator!: TemplateRef<void>;
}
