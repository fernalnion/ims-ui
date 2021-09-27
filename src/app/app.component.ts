import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NzConfigService } from 'ng-zorro-antd/core/config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('nzIndicatorTpl', { static: true })
  nzIndicator!: TemplateRef<void>;
  isCollapsed = false;
  constructor(private readonly nzConfigService: NzConfigService) {}

  ngOnInit(): void {
    this.nzConfigService.set('spin', { nzIndicator: this.nzIndicator });
  }
}
