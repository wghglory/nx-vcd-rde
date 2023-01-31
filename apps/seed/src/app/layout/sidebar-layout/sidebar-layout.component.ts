import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'seed-sidebar-layout',
  templateUrl: './sidebar-layout.component.html',
  styleUrls: ['./sidebar-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarLayoutComponent {}
